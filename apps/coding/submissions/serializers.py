from rest_framework import serializers
from .models import Submission


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = (
            "id",
            "user",
            "problem",
            "language",
            "source_code",
            "status",
            "runtime",
            "memory",
            "score",
            "judge0_token",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "status",
            "runtime",
            "memory",
            "score",
            "judge0_token",
            "created_at",
            "updated_at",
        )
