from rest_framework.permissions import BasePermission, SAFE_METHODS
from apps.common.choices import UserRole

class IsProblemManager(BasePermission):

    def has_permission(self, request, view):

        print("Authenticated:", request.user.is_authenticated)

        if request.user.is_authenticated:
            print("User:", request.user)
            print("Role:", request.user.role)

        if request.method in SAFE_METHODS:
            return True

        if not request.user.is_authenticated:
            return False

        return request.user.role in (
            UserRole.ADMIN,
            UserRole.FACULTY,
        )