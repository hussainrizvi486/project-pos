from rest_framework import serializers
from apps.pos.models.item import (
    Item,
    ItemVariant,
    PriceList,
    ItemPrice,
    ItemUom,
    UOM,
    Category,
)


class ItemVarinatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariant
        fields = ["attribute", "attribute_value"]


class ItemSerailizer(serializers.ModelSerializer):
    item_variant = ItemVarinatSerializer(many=True, read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    image = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField(read_only=True)
    default_uom = serializers.SerializerMethodField()

    def get_default_uom(self, obj):
        if not obj.default_uom:
            return {}
        return {
            "name": obj.default_uom.name,
            "id": obj.default_uom.id,
        }

    def get_category(self, obj):
        if not obj.category:
            return {}

        return {
            "id": obj.category.id,
            "name": obj.category.name,
        }

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
            "description",
            # "uom",
            "disabled",
            "variant_of",
            "item_type",
            "default_uom",
        ]


class PriceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceList
        fields = ["currency", "price_list", "disabled", "price_list_type"]


class ItemPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPrice
        fields = ("item", "price_list", "price", "valid_from", "valid_to")


class CreateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            "item_name",
            "category",
            "description",
            "disabled",
            "image",
            "default_uom",
        ]


class ItemUomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemUom
        fields = ["item", "uom", "conversion_factor"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class UOMSerializer(serializers.ModelSerializer):
    class Meta:
        model = UOM
        fields = ["id", "name"]


# class ItemCreateSerializer(serializers.ModelSerializer):
#     category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
#     default_uom = serializers.PrimaryKeyRelatedField(
#         queryset=UOM.objects.all(), required=False, allow_null=True
#     )

#     class Meta:
#         model = Item
#         fields = [
#             "image",
#             "item_name",
#             "category",
#             "description",
#             "default_uom",
#             "item_type",
#             "disabled",
#             "variant_of",
#         ]

#         extra_kwargs = {
#             "item_type": {"required": False},
#             "disabled": {"required": False},
#             "variant_of": {"required": False},
#             "description": {"required": False},
#         }

#     def validate(self, attrs):
#         # Add any custom validation logic here
#         return attrs

#     def create(self, validated_data):
#         return Item.objects.create(**validated_data)
