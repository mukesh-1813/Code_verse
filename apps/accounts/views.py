from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.generics import RetrieveUpdateAPIView, GenericAPIView

from apps.common.responses import ApiResponse

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    LogoutSerializer,
    UserSerializer,
    UpdateProfileSerializer,
    ChangePasswordSerializer,
)
from .services import AuthService, UserService


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return ApiResponse.success(
            message="User registered successfully.",
            data=UserSerializer(user).data,
            status_code=status.HTTP_201_CREATED,
        )


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)

        return ApiResponse.success(
            message="Login successful.",
            data=serializer.validated_data,
            status_code=status.HTTP_200_OK,
        )

class LogoutView(GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        success = AuthService.logout(
            serializer.validated_data["refresh"]
        )

        if not success:
            return ApiResponse.error(
                message="Invalid refresh token.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        return ApiResponse.success(
            message="Logged out successfully.",
            status_code=status.HTTP_200_OK,
        )
class ProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return UserSerializer
        return UpdateProfileSerializer

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())

        return ApiResponse.success(
            message="Profile fetched successfully.",
            data=serializer.data,
        )

    def partial_update(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            self.get_object(),
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        user = UserService.update_profile(
            request.user,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Profile updated successfully.",
            data=UserSerializer(user).data,
        )
class ChangePasswordView(GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            UserService.change_password(
                request.user,
                serializer.validated_data,
            )
        except ValueError as e:
            return ApiResponse.error(
                message=str(e),
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        return ApiResponse.success(
            message="Password changed successfully.",
            status_code=status.HTTP_200_OK,
        )