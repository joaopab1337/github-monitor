from django_filters import rest_framework as filters

from .models import Commit


class CommitFilter(filters.FilterSet):
    message = filters.CharFilter(field_name='message', lookup_expr='icontains')
    repository = filters.CharFilter(field_name='repository__name', lookup_expr='icontains')
    author = filters.CharFilter(field_name='author', lookup_expr='icontains')


    class Meta:
        model = Commit
        fields = [
            'message',
            'repository__name',
            'author',
        ]
