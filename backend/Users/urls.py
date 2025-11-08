from django.urls import include, path
from rest_framework.routers import SimpleRouter

from backend.Users.viewsets.users import UsersViewset

routers = SimpleRouter()
routers.register(r"user", UsersViewset, basename="user")

urlpatterns = [path("", include(routers.urls))]
