from githubmonitor.celery import app

from social_django.models import UserSocialAuth

import datetime
import requests

from .models import Repository, Commit

@app.task(name="fetch_commits")
def fetch_commits(user, repository_name):
    current_date = datetime.datetime.now()
    last_30_days = (current_date - datetime.timedelta(days=30)).strftime('%Y-%m-%d %H:%M:%SZ')
    
    social_user = UserSocialAuth.objects.get(user=user)
    token = social_user.extra_data['access_token']

    url = 'https://api.github.com/repos/{}/{}/commits'.format(user, repository_name)
    request_params = {
        'since': last_30_days,
    }
    
    response = requests.get(url, params=request_params, headers={'Authorization': f'Token {token}'}).json()

    for item in response:
        repository = Repository.objects.get(name=repository_name)
        author = item['author'] if item['author'] is not None else {}
        commit_data = {
            'message': item['commit']['message'],
            'sha': item['sha'],
            'author': author.get('login', ''),
            'url': item['url'],
            'date': item['commit']['author']['date'],
            'avatar': author.get('avatar_url', ''),
            'repository': repository
        }
        Commit.objects.create(**commit_data)

    return
