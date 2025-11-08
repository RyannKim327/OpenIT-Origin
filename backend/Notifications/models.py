from BaseAuth.models import BaseAuthModel
from Users.models import User
from django.db import models
from django.utils import timezone
# Create your models here.


class Notification(models.Model):
    class NotificationType(models.TextChoices):
        REPORT = 'report'
        DISASTER = 'disaster'


    to = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    content = models.TextField()
    type = models.CharField(
        choices=NotificationType.choices,
        default=NotificationType.DISASTER,
        max_length=40
    )
    date_notified = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"notified {self.to.first_name}"

    class Meta:
        ordering = ["-date_notified"]
