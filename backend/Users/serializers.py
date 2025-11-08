from rest_framework.serializers import ModelSerializer

from Users.models import User, UserPreference


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserPreferenceSerializer(ModelSerializer):
    class Meta:
        model = UserPreference
        fields = "__all__"
