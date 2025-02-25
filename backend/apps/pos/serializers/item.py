from rest_framework import serializers
from apps.pos.models.item import Item, ItemVariant, PriceList, ItemPrice


class ItemVarinatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariant
        fields = ["attribute", "attribute_value"]


class ItemSerailizer(serializers.ModelSerializer):
    item_variant = ItemVarinatSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    image = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    def get_image(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")
        if not request:
            return obj.image.url

        return request.build_absolute_uri(obj.image.url)

    class Meta:
        model = Item
        fields = [
            "price",
            "image",
            "id",
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


class PriceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceList
        fields = ("currency", "price_list", "disabled", "price_list_type")


class ItemPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPrice
        fields = ("item", "price_list", "price", "valid_from", "valid_to")
