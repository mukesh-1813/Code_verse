from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RunCodeSerializer
from .services import PistonService


class RunCodeAPIView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = RunCodeSerializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)   # <-- Add this
            return Response(serializer.errors, status=400)

        result = PistonService.execute(**serializer.validated_data)

        return Response(result)