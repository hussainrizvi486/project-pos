from rest_framework import serializers
from apps.pos.models.invoice import POSInvoice, POSInvoiceItem


class POSInvoicePaymentSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_mode = serializers.CharField(required=True)


class POSInvoiceItemSerializer(serializers.ModelSerializer):
    discount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)

    class Meta:
        model = POSInvoiceItem
        fields = [
            "item",
            # "uom",
            "net_rate",
            "qty",
            "discount",
        ]


class POSInvoiceSerializer(serializers.ModelSerializer):
    items = POSInvoiceItemSerializer(many=True, required=True)
    payments = POSInvoicePaymentSerializer(many=True, required=False)

    class Meta:
        model = POSInvoice
        fields = [
            "items",
            "payments",
            "customer",
            "posting_date",
        ]

    def create(self, validated_data):
        items = validated_data.pop("items")
        payments = validated_data.pop("payments", [])

        invoice = POSInvoice.objects.create(**validated_data)
        for item in items:
            POSInvoiceItem.objects.create(invoice=invoice, **item)

        return invoice


class POSInvoiceListSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(source="customer.customer_name", read_only=True)

    class Meta:
        model = POSInvoice
        fields = [
            "id",
            "customer",
            "posting_date",
            "total_qty",
            "net_total",
            "tax_amount",
            "additional_discount",
            "discount_amount",
            "outstanding_amount",
            "paid_amount",
            "grand_total",
        ]
