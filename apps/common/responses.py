from rest_framework.response import Response


class ApiResponse:
    @staticmethod
    def success(message="", data=None, status_code=200):
        return Response(
            {
                "success": True,
                "message": message,
                "data": data,
            },
            status=status_code,
        )

    @staticmethod
    def error(message="", errors=None, status_code=400):
        return Response(
            {
                "success": False,
                "message": message,
                "errors": errors,
            },
            status=status_code,
        )