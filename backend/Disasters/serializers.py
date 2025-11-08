from rest_framework import serializers
from Disasters.models import Disaster, Report


class DisasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disaster
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"
        