from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AuthUser, Token


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: AuthUser) -> Token:
        token = super().get_token(user)
        token["is_superuser"] = user.is_superuser
        token["username"] = user.username
        token["groups"] = list(user.groups.values_list("name", flat=True))
        return token
