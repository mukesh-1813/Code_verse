from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import SubmissionService
from .serializers import SubmissionSerializer
from .models import Submission


class SubmissionCreateView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        try:
            submission = SubmissionService.create_submission(
                user=user,
                problem_id=data.get("problem_id"),
                language=data.get("language"),
                version=data.get("version"),
                source_code=data.get("source_code"),
            )
            serializer = SubmissionSerializer(submission)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SubmissionListView(generics.ListAPIView):
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user)


class SubmissionDetailView(generics.RetrieveAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
