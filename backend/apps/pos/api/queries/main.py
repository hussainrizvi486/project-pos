from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from apps.pos.models.item import Category, UOM


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "id"]


class CategoryQuery(ListAPIView):
    """
    API endpoint to retrieve all categories.
    """

    # permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class UOMSerializer(serializers.ModelSerializer):
    class Meta:
        model = UOM
        fields = ["name", "id"]


class UOMQuery(ListAPIView):
    """
    API endpoint to retrieve all UOMs.
    """

    # permission_classes = [IsAuthenticated]
    serializer_class = UOMSerializer
    queryset = UOM.objects.all()
