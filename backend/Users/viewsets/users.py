from BaseAuth.views import BaseAuthModelViewset
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from Users.models import User
from Users.serializers import UserSerializer


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

    @action(
        detail=False, methods=["POST"], url_path="login", permission_classes=[AllowAny]
    )
    def login(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return Response({"error": "Please provide username or password."})

        # INFO: This Q use for easy searching and filtering data with multiple columns in django models
        try:
            usr = User.objects.get(Q(username=username) | Q(email=username))
        except Exception as e:
            return Response({"error": "Invalid credentials"})

        user_data = authenticate(username=usr.username, password=password)

        if not user_data:
            return Response({"error": "Invalid credentials"})

        refresh = RefreshToken.for_user(user_data)
        # print(user_data.groups)
        return Response(
            {
                "message": "Logged in successfully.",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "username": user_data.username,
                    "first_name": user_data.first_name,
                    "middle_name": user_data.middle_name,
                    "last_name": user_data.last_name,
                    "email": user_data.email,
                    "sex": user_data.sex,
                },
            }
        )

    @action(
        detail=False,
        methods=["POST"],
        url_path="register",
        permission_classes=[AllowAny],
    )
    def register(self, request):
        try:
            data = request.data

            data["username"] = str(uuid.uuid1()).replace("-", "")[:12]

            # TODO: To make their name appropiate
            data["first_name"] = data["first_name"].capitalize()

            if not data["last_name"].startswith("de "):
                data["last_name"] = data["last_name"].capitalize()
            if data["middle_name"]:
                if not data["middle_name"].startswith("de "):
                    data["middle_name"] = data["middle_name"].capitalize()

            serializer = self.serializer_class(data=data, partial=True)
            if serializer.is_valid():
                serializer.save()

                return Response(
                    {
                        "message": "New account created successfully",
                        "data": serializer.data,
                    }
                )
            return Response(
                {"error": f"Error: {self.extract_error_handler(serializer.errors)}"}
            )
        except Exception as e:
            return Response({"error": str(e)})
