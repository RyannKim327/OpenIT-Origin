from rest_framework.serializers import ModelSerializer

from Users.models import User, UserPreference


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # extra_kwargs = {'password':{{'read_only':True}}}


class UserPreferenceSerializer(ModelSerializer):
    class Meta:
        model = UserPreference
        fields = "__all__"
