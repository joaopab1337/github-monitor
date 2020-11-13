from django.urls import path

from .views import CommitList, RepositoryList

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', CommitList.as_view(), name='commits-list'),
    path('api/repositories/', RepositoryList.as_view(), name='repositories-create'),
]
