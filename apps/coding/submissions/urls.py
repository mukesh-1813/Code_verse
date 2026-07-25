from django.urls import path
from .views import SubmissionCreateView, SubmissionListView, SubmissionDetailView

urlpatterns = [
    path("submissions/", SubmissionCreateView.as_view(), name="create-submission"),
    path("submissions/list/", SubmissionListView.as_view(), name="list-submissions"),
    path("submissions/<int:pk>/", SubmissionDetailView.as_view(), name="submission-detail"),
]
