from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class RegisterTest(APITestCase):

    def test_register_user(self):
        data = {
            "email": "mukesh@example.com",
            "first_name": "Mukesh",
            "last_name": "Kumar",
            "role": "STUDENT",
            "password": "Password@123",
            "confirm_password": "Password@123",
        }

        response = self.client.post(
            "/api/auth/register/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )