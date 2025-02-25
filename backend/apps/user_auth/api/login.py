from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user_auth.serializers import LoginSerializer, JWTTokenSerializer
from apps.user_auth.models import User


class LoginAPIView(APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)

        if serializer.is_valid():
            user: User = authenticate(**serializer.validated_data)
            if user is None:
                return Response(
                    data={"message": "Invalid email or password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if user.two_factor_auth:
                return Response(
                    data={"message": "login email send successfully!"},
                    status=status.HTTP_200_OK,
                )
            jwt_object = JWTTokenSerializer.get_token(user)
            tokens = {
                "access": str(jwt_object.access_token),
                "refresh": str(jwt_object),
            }
            return Response(
                data={"message": "login successful!", "tokens": tokens},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
