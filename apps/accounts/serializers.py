from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

from .services import AuthService, UserService

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )

    confirm_password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "role",
            "password",
            "confirm_password",
        )

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        return UserService.create_user(validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    def validate(self, attrs):
        user = authenticate(
            request=self.context.get("request"),
            email=attrs["email"],
            password=attrs["password"],
        )

        if user is None:
            raise serializers.ValidationError(
                {"detail": "Invalid email or password."}
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {"detail": "Your account is inactive."}
            )

        return AuthService.build_login_response(user)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "role",
        )


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
        )


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    new_password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )

    confirm_password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password": "Passwords do not match."
                }
            )
        return attrs