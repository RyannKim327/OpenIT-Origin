from django.contrib.auth.models import AbstractUser
from django.db import models
from BaseAuth.models import BaseAuthModel
# Create your models here.


class User(AbstractUser):
    middle_name = models.CharField(max_length=25, null=True, blank=True)
    latitude = models.CharField(max_length=100, null=True, blank=True)
    longitude = models.CharField(max_length=100, null=True, blank=True)
    formatted_location_string = models.TextField(null=True, blank=True)


class UserPreference(BaseAuthModel):
    class AlertTypes(models.TextChoices):
        URGENT = "urgent"
        PRIORITY = "priority"
        MILD = "mild"

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    alert_types = models.CharField(
        choices=AlertTypes.choices, default=AlertTypes.PRIORITY, max_length=20
    )
    location_range = models.IntegerField(null=True, blank=True)
    minimum_magnitude = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user.first_name} preference"
