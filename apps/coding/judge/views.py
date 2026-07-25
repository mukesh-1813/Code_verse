from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RunCodeSerializer
from .services import PistonService


class RunCodeAPIView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = RunCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = PistonService.execute(
            **serializer.validated_data
        )

        return Response(
            result,
            status=status.HTTP_200_OK,
        )