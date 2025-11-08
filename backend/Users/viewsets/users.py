from rest_framework.permissions import AllowAny
from BaseAuth.views import BaseAuthModelViewset
from Users.serializers import UserSerializer
from Users.models import User


class UsersViewset(BaseAuthModelViewset):
    serializer_class = UserSerializer
    queryset = User.objects.filter
    permission_classes = [AllowAny]  # TODO: This AllowAny is just temporary

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.queryset)
        if page:
            data = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
            return data

        data = self.serializer_class(self.queryset.all(), many=True)

        return Response(data)
