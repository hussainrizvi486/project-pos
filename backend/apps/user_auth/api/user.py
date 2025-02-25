from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from apps.user_auth.models import User
from apps.user_auth.serializers import UserSerializer


class UserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, *args, **kwargs):
        user_object = User.objects.get(id=self.request.user.id)
        serializer = UserSerializer(user_object)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
