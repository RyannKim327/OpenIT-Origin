from Notifications.models import Notification
from Notifications.serializers import NotificationSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

class NotificationViewsets(ModelViewSet):
    queryset = Notification.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        # check if user is staff, if not then give only notification user restricted data
        queryset = self.queryset
        user = self.request.user

        if user.is_staff:
            pass
        else:
            queryset.filter(to_id=user.id)

        return queryset








