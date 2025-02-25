from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.user_auth.models import User, UserRole


class JWTTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["id"] = user.id
        return token


class UserRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ["id", "role"]


class UserSerializer(serializers.ModelSerializer):
    roles = UserRolesSerializer(many=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "two_factor_auth",
            "first_name",
            "last_name",
            "roles",
        ]
