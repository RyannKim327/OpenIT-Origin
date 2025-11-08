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
        MINOR = "minor"                #<3
        MODERATE = "moderate"               #3-4.5
        STRONG = "strong"                      #4.5 - 6
        MAJOR = "major"                       #6>




    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, related_name="preference")
    alert_types = models.CharField(
        choices=AlertTypes.choices,
        default=AlertTypes.MINOR,
        max_length=20
    )
    location_range = models.IntegerField(null=True, blank=True)
    magnitude_range = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} preference"
