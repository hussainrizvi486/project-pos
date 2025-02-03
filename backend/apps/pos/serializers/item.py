from rest_framework import serializers
from apps.pos.models.item import Item, ItemVariant


class ItemVarinatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariant
        fields = ["attribute", "attribute_value"]


class ItemSerailizer(serializers.ModelSerializer):
    item_variant = ItemVarinatSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Item
        fields = [
            "id",
            "image",
            "item_variant",
            "item_name",
            "category",
            "category_name",
            "description",
            "disabled",
            "variant_of",
            "item_type",
            "default_uom",
        ]
