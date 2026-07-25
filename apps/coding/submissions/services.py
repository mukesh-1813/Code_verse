from django.db import transaction

from apps.coding.problems.models import Problem, TestCase
from apps.coding.judge.services import PistonService

from .models import Submission


class SubmissionService:

    @staticmethod
    @transaction.atomic
    def create_submission(
        *,
        user,
        problem_id,
        language,
        version,
        source_code,
    ):
        problem = Problem.objects.get(pk=problem_id)

        submission = Submission.objects.create(
            user=user,
            problem=problem,
            language=language,
            source_code=source_code,
            status=Submission.Status.QUEUED,
        )

        test_cases = TestCase.objects.filter(
            problem=problem,
            is_sample=False,
        ).order_by("order")

        submission.total_test_cases = test_cases.count()

        passed = 0
        runtime = 0
        memory = 0
        verdict = Submission.Status.ACCEPTED

        for test_case in test_cases:
            result = PistonService.execute(
                language=language,
                version=version,
                files=[{"content": source_code}],
                stdin=test_case.input,
            )

            run = result["run"]

            runtime = max(runtime, run.get("cpu_time", 0))
            memory = max(memory, run.get("memory", 0))

            # Runtime Error
            if run.get("code") != 0:
                verdict = Submission.Status.RUNTIME_ERROR
                break

            actual = run.get("stdout", "").strip()
            expected = test_case.expected_output.strip()

            if actual != expected:
                verdict = Submission.Status.WRONG_ANSWER
                break

            passed += 1

        submission.status = verdict
        submission.runtime = runtime
        submission.memory = memory
        submission.passed_test_cases = passed
        submission.save()

        return submission
