import requests
import datetime

from django.db import IntegrityError
from django.db.models import Count

from social_django.models import UserSocialAuth

from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.views import APIView

from django_filters import rest_framework as filters

from .exceptions import AlreadyExists
from .filters import CommitFilter
from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .tasks import fetch_commits


class CommitList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommitFilter

    def get_queryset(self):
        return self.queryset.filter(repository__user=self.request.user)


class RepositoryList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).annotate(amount=Count('commit'))

    def post(self, request, *args, **kwargs):
        # Repository.objects.all().delete()
        repository_name = request.data['name']
        user = request.user

        # Check if the repository exists on github
        try:
            social_user = UserSocialAuth.objects.get(user=user)
            token = social_user.extra_data['access_token']
            url = 'https://api.github.com/repos/{}/{}'.format(request.user, repository_name) 
            r = requests.get(url, headers={'Authorization': f'Token {token}'})
            r.raise_for_status()
        except requests.exceptions.HTTPError:
            raise NotFound('A repository with this username was not found')

        # Check if the repository exists on the database
        if Repository.objects.filter(name=repository_name).exists():
            return Response({ 'detail': 'A repository with this name already exists' }, status=status.HTTP_400_BAD_REQUEST)

        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = self.request.user
        repository_name = self.request.data['name']
        instance = serializer.save(name=repository_name, user=user)
        fetch_commits(user, repository_name)
