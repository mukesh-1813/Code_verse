from django.urls import path

from .views import RunCodeAPIView

urlpatterns = [
    path(
        "run/",
        RunCodeAPIView.as_view(),
        name="run-code",
    ),
]