from django.conf import settings
from django.db import models

from apps.coding.problems.models import Problem


class Submission(models.Model):

    class Status(models.TextChoices):
        QUEUED = "QUEUED", "Queued"
        PROCESSING = "PROCESSING", "Processing"
        ACCEPTED = "ACCEPTED", "Accepted"
        WRONG_ANSWER = "WRONG_ANSWER", "Wrong Answer"
        TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED", "Time Limit Exceeded"
        RUNTIME_ERROR = "RUNTIME_ERROR", "Runtime Error"
        COMPILATION_ERROR = "COMPILATION_ERROR", "Compilation Error"
        INTERNAL_ERROR = "INTERNAL_ERROR", "Internal Error"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="submissions",
    )

    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE,
        related_name="submissions",
    )

    language = models.CharField(max_length=50)

    source_code = models.TextField()

    status = models.CharField(
        max_length=40,
        choices=Status.choices,
        default=Status.QUEUED,
    )

    runtime = models.FloatField(
        null=True,
        blank=True,
    )

    memory = models.IntegerField(
        null=True,
        blank=True,
    )

    score = models.PositiveIntegerField(default=0)

    judge0_token = models.CharField(
        max_length=200,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.problem.title}"