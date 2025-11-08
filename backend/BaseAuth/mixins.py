from rest_framework import status
from rest_framework.views import exception_handler


class CustomMixins:
    def handle_exception(seld, exc):
        response = exception_handler(exc, self.get_exception_handler_context())

        if (
            response is not None
            and response.status_code == status.HTTP_401_UNAUTHORIZED
        ):
            response = {
                "error": "It seems links your token is invalid. Please reload the page"
            }

        return response
