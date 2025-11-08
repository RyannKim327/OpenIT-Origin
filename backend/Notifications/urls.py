from django.urls import path, include
from rest_framework.routers import SimpleRouter
from Notifications.views import NotificationViewsets

router = SimpleRouter()
router.register(r'notifications', NotificationViewsets, basename="notifications")

urlpatterns = [
    path("", include(router.urls))
]



