from rest_framework import serializers
from apps.pos.models.invoice import POSInvoice, POSInvoiceItem


class POSInvoiceSerailizer(serializers.ModelSerializer):
    class Items(serializers.Serializer):
        discount = serializers.DecimalField(
            max_digits=10, decimal_places=2, required=False
        )

        class Meta:
            model = POSInvoiceItem
            fields = [
                "item",
                "uom",
                "net_rate",
                "qty",
                "discount",
            ]

    class Payments(serializers.Serializer):
        amount = serializers.DecimalField(max_digits=10, decimal_places=2, default=0)
        payment_mode = serializers.CharField(required=True)

    items = Items(many=True, required=True)
    payments = Payments(many=True, required=False)

    class Meta:
        model = POSInvoice
        fields = [
            "items",
            "payments",
            "customer",
            "posting_date",
        ]

    def create(self, validated_data):
        # items = validated_data.pop("items")
        # payments = validated_data.pop("payments")
        # invoice = POSInvoice.objects.create(**validated_data)
        return
