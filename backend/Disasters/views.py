from rest_framework.viewsets import ModelViewSet
from Disasters.serializers import DisasterSerializer, ReportSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from Disasters.models import Disaster, Report

 

class DisasterViewsets(ModelViewSet):
    queryset = Disaster.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DisasterSerializer


class ReportViewsets(ModelViewSet):
    queryset = Report.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ReportSerializer

