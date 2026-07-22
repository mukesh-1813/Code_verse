from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

User = get_user_model()


class UserService:
    @staticmethod
    def create_user(validated_data):
        validated_data.pop("confirm_password", None)
        return User.objects.create_user(**validated_data)
    @staticmethod
    def update_profile(user, validated_data):
        user.first_name = validated_data.get(
        "first_name",
        user.first_name,
            )

        user.last_name = validated_data.get(
        "last_name",
        user.last_name,
        )

        user.save()

        return user


    @staticmethod
    def change_password(user, validated_data):
        if not user.check_password(
        validated_data["old_password"]
        ):
            raise ValueError("Old password is incorrect.")

        user.set_password(validated_data["new_password"])
        user.save()

        return user


class AuthService:
    @staticmethod
    def generate_tokens(user):
        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

    @staticmethod
    def build_login_response(user):
        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role,
            },
            "tokens": AuthService.generate_tokens(user),
        }

    @staticmethod
    def logout(refresh_token):
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return True
        except TokenError:
            return False