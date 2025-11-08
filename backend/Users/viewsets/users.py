from BaseAuth.views import BaseAuthModelViewset
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from Users.models import User
from Users.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
import uuid


class UsersViewset(BaseAuthModelViewset):
    serializer_class = UserSerializer
    queryset = User.objects.all()  # ixed queryset
    permission_classes = [AllowAny]  # TODO: Temporary; restrict later

    # fetch all users (paginated)
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # fetch a single user by ID or username
    def retrieve(self, request, pk=None):
        try:
            # Allow lookup by either ID or username
            user = User.objects.filter(Q(id=pk) | Q(username=pk)).first()
            if not user:
                return Response({"error": "User not found."}, status=404)
            serializer = self.serializer_class(user)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


    @action(detail=False, methods=["POST"], url_path="login", permission_classes=[AllowAny])
    def login(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return Response({"error": "Please provide username and password."}, status=400)

        try:
            usr = User.objects.get(Q(username=username) | Q(email=username))
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=401)

        user_data = authenticate(username=usr.username, password=password)
        if not user_data:
            return Response({"error": "Invalid credentials"}, status=401)

        refresh = RefreshToken.for_user(user_data)
        return Response({
            "message": "Logged in successfully.",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user_data.id,
                "username": user_data.username,
                "first_name": user_data.first_name,
                "middle_name": user_data.middle_name,
                "last_name": user_data.last_name,
                "email": user_data.email,
            },
        })

    
    @action(detail=False, methods=["POST"], url_path="register", permission_classes=[AllowAny])
    def register(self, request):
        try:
            data = request.data
            data["username"] = str(uuid.uuid1()).replace("-", "")[:12]
            data["first_name"] = data["first_name"].capitalize()

            if not data["last_name"].startswith("de "):
                data["last_name"] = data["last_name"].capitalize()
            if data.get("middle_name"):
                if not data["middle_name"].startswith("de "):
                    data["middle_name"] = data["middle_name"].capitalize()

            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(data["password"])
                user.save()

                return Response({
                    "message": "New account created successfully",
                    "data": self.serializer_class(user).data,
                })
            return Response({"error": serializer.errors}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
