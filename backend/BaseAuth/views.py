from django.shortcuts import render
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import exception_handler
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from BaseAuth.mixins import CustomMixins
from BaseAuth.pagination import BasePaginator

# Create your views here.


class BaseAuthModelViewset(ModelViewSet, CustomMixins):
    pagination_class = BasePaginator
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        return Response({"error": "Unauthorized"})

    def extract_error_handler(self, err):
        if isinstance(err, dict):
            for key, value in err.items():
                if isinstance(value, list) and value:
                    return str(value[0])
                else:
                    return self.extract_error_handler(value)
        return str(err)
