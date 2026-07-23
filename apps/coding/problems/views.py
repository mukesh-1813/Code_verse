from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.common.responses import ApiResponse

from .models import Problem, Example
from .permissions import IsProblemManager
from .selectors import (
    ProblemSelector,
    ExampleSelector,
)
from .serializers import (
    ProblemSerializer,
    ProblemDetailSerializer,
    ProblemCreateUpdateSerializer,
    ExampleSerializer,
    ExampleCreateUpdateSerializer,
)
from .services import (
    ProblemService,
    ExampleService,
)


class ExampleViewSet(viewsets.ViewSet):

    permission_classes = [IsProblemManager]

    def list(self, request, problem_slug=None):

        problem = ProblemSelector.get_problem_by_slug(problem_slug)

        examples = ExampleSelector.get_examples(problem)

        serializer = ExampleSerializer(
            examples,
            many=True,
        )

        return ApiResponse.success(
            data=serializer.data,
        )

    def create(self, request, problem_slug=None):

        problem = ProblemSelector.get_problem_by_slug(problem_slug)

        serializer = ExampleCreateUpdateSerializer(
            data=request.data,
            context={
                "problem": problem,
            },
        )

        serializer.is_valid(raise_exception=True)

        example = ExampleService.create_example(
            problem,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Example created successfully.",
            data=ExampleSerializer(example).data,
            status_code=status.HTTP_201_CREATED,
        )

    def partial_update(self, request, pk=None):

        example = ExampleSelector.get_example_by_id(pk)

        serializer = ExampleCreateUpdateSerializer(
            example,
            data=request.data,
            partial=True,
            context={
                "problem": example.problem,
            },
        )

        serializer.is_valid(raise_exception=True)

        example = ExampleService.update_example(
            example,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Example updated successfully.",
            data=ExampleSerializer(example).data,
        )

    def destroy(self, request, pk=None):

        example = ExampleSelector.get_example_by_id(pk)

        ExampleService.delete_example(example)

        return ApiResponse.success(
            message="Example deleted successfully.",
        )
class ProblemViewSet(viewsets.ModelViewSet):

    lookup_field = "slug"

    def get_permissions(self):
        if self.action in (
            "create",
            "update",
            "partial_update",
            "destroy",
        ):
            return [IsProblemManager()]

        return [IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        if (
            self.request.user.is_authenticated
            and self.request.user.role
            in (
                self.request.user.Role.ADMIN,
                self.request.user.Role.FACULTY,
            )
        ):
            return Problem.objects.prefetch_related(
                "tags",
                "examples",
                "test_cases",
            )

        return ProblemSelector.get_published_problems()

    def get_serializer_class(self):
        if self.action in (
            "create",
            "update",
            "partial_update",
        ):
            return ProblemCreateUpdateSerializer

        if self.action == "retrieve":
            return ProblemDetailSerializer

        return ProblemSerializer

    def get_object(self):
        if (
            self.request.user.is_authenticated
            and self.request.user.role
            in (
                self.request.user.Role.ADMIN,
                self.request.user.Role.FACULTY,
            )
        ):
            return super().get_object()

        problem = ProblemSelector.get_problem_by_slug(
            self.kwargs["slug"]
        )

        if problem is None:
            from django.http import Http404
            raise Http404

        return problem

    def perform_create(self, serializer):
        self.problem = ProblemService.create_problem(
            serializer.validated_data,
            self.request.user,
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        return ApiResponse.success(
            message="Problem created successfully.",
            data=ProblemDetailSerializer(self.problem).data,
            status_code=status.HTTP_201_CREATED,
        )

    def perform_update(self, serializer):
        self.problem = ProblemService.update_problem(
            serializer.instance,
            serializer.validated_data,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)

        instance = self.get_object()

        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial,
        )

        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        return ApiResponse.success(
            message="Problem updated successfully.",
            data=ProblemDetailSerializer(self.problem).data,
        )

    def perform_destroy(self, instance):
        ProblemService.delete_problem(instance)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        self.perform_destroy(instance)

        return ApiResponse.success(
            message="Problem deleted successfully."
        )