from rest_framework import status
from rest_framework.exceptions import APIException

class AlreadyExists:
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'A repository with this name already exists.'
    default_code = 'bad_request'