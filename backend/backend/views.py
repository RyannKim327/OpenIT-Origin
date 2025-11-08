from rest_framework.response import Response
from rest_framework.views import APIView


class fallback(APIView):
    def get(self, request):
        code = {"error": "Endpoint Exception", "code": "SECRET_PATH_EXCEPTIONJk o"}
        return Response(code)
