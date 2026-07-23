from django.db.models import Prefetch

from .models import Problem, TestCase


class ProblemSelector:

    @staticmethod
    def get_published_problems():
        return (
            Problem.objects.filter(is_published=True)
            .prefetch_related("tags")
            .order_by("title")
        )

    @staticmethod
    def get_problem_by_slug(slug):
        return (
            Problem.objects.filter(
                slug=slug,
                is_published=True,
            )
            .prefetch_related(
                "tags",
                "examples",
                Prefetch(
                    "test_cases",
                    queryset=TestCase.objects.filter(
                        is_sample=True
                    ).order_by("order"),
                    to_attr="sample_test_cases",
                ),
            )
            .first()
        )

    @staticmethod
    def get_problem_for_admin(slug):
        return (
            Problem.objects.filter(slug=slug)
            .prefetch_related(
                "tags",
                "examples",
                "test_cases",
            )
            .first()
        )