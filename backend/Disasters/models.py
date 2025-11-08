from django.db import models
from django.utils import timezone
from Users.models import User
from BaseAuth.models import BaseAuthModel
# Create your models here.


class Disaster(BaseAuthModel):
    order = 'date_recorded'


    latitude = models.CharField(max_length=80, null=False)
    longitude = models.CharField(max_length=80, null=False)
    formatted_location_string = models.TextField(null=True, blank=True)
    magnitude = models.DecimalField(max_digits=3, decimal_places=2, null=False)
    date_recorded = models.DateField(default=timezone.now)

    def __str__(self):
        return f'{self.formatted_location_string}: {self.magnitude}' if self.formatted_location_string else f'lat: {self.latitude} - lng: {self.longitude} : M{self.magnitude}'
    
class Report(BaseAuthModel):
    class ReportStatus(models.TextChoices):
        PENDING = 'pending'
        VERIFIED = "verified"


    order = "date_reported"
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name='reports')
    photo = models.ImageField(upload_to='', null=True, blank=True)
    description = models.TextField()
    status = models.CharField(
        choices=ReportStatus.choices,
        default=ReportStatus.PENDING,
        max_length=50
    )
    latitude = models.CharField(max_length=80, null=False)
    longitude = models.CharField(max_length=80, null=False)
    formatted_location_string = models.TextField(null=True, blank=True)
    date_reported = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.reporter.first_name} reported {self.description} in {self.formatted_location_string}'
    

    # to avoid duplicates report by a user
    # to avoid dplocats when a user submitted a user, it check if the user has reported a latitude and longitude and datereported the same
    class Meta:
        unique_together = [['reporter','latitude', 'longitude','date_reported']]


