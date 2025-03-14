from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from apps.pos.models.main import UOM
from apps.pos.serializers.main import UOMSerializer
from django.shortcuts import get_object_or_404


class UOMAPIView(APIView):
    def get(self, *args, **kwargs):
        queryset = UOM.objects.all()
        serializer = UOMSerializer(queryset, many=True)
        return Response(data=serializer.data)

    def post(self, request):
        serializer = UOMSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        instance = get_object_or_404(UOM, id=id)
        serializer = UOMSerializer(data=request.data, instance=instance, partial=True)

        if serializer.is_valid():
            serializer.update(instance, serializer.validated_data)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data={}, status=status.HTTP_400_BAD_REQUEST)
