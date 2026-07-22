from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from codeverse_backend.apps.common.choices import UserRole
from codeverse_backend.apps.common.models import BaseModel

from .managers import UserManager




class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    
    
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=100)

    last_name = models.CharField(max_length=100)

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.STUDENT,
    )

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    class Meta:
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email