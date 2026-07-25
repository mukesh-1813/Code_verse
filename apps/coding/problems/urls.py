from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProblemViewSet,
    ExampleViewSet,
    TestCaseViewSet,
)


router = DefaultRouter()
router.register("", ProblemViewSet, basename="problems")

urlpatterns = router.urls + [

    path(
        "<slug:problem_slug>/examples/",
        ExampleViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
        name="problem-examples",
    ),

    path(
        "examples/<int:pk>/",
        ExampleViewSet.as_view(
            {
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
        name="example-detail",
    ),
       path(
        "<slug:problem_slug>/test-cases/",
        TestCaseViewSet.as_view({
            "get": "list",
            "post": "create",
        }),
        name="test-case-list-create",
    ),
      path(
        "test-cases/<int:pk>/",
        TestCaseViewSet.as_view({
            "patch": "partial_update",
            "delete": "destroy",
        }),
        name="test-case-detail",
    ),
]