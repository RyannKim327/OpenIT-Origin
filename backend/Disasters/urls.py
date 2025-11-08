from django.urls import path, include
from rest_framework.routers import SimpleRouter
from Disasters.views import DisasterViewsets, ReportViewsets

router = SimpleRouter()
router.register(r'disasters', DisasterViewsets, basename='disasters')
router.register(r'reports', ReportViewsets, basename="reports")

urlpatterns = [
    path("", include(router.urls))
]
