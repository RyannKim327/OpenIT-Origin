from BaseAuth.models import BaseAuthModel
from Users.models import User
from django.db import models
from django.utils import timezone
# Create your models here.

class Notification(BaseAuthModel):

    to = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    content = models.TextField()
    date_notified = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return f'notified {self.to.first_name}'

