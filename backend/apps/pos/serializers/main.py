from rest_framework import serializers
from apps.pos.models.item import Category, UOM


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class UOMSerializer(serializers.ModelSerializer):
    class Meta:
        model = UOM
        fields = ["id", "name"]
