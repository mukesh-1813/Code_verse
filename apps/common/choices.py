from django.db import models


class UserRole(models.TextChoices):
    STUDENT = "STUDENT", "Student"
    FACULTY = "FACULTY", "Faculty"
    ADMIN = "ADMIN", "Admin"