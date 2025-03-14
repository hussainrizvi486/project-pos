from rest_framework import serializers
from apps.pos.models import Customer


class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "customer_name"]


class CreateCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["customer_name", "mobile_no", "email", "user"]

    def create(self, validated_data):
        customer = Customer.objects.create(**validated_data)
        return customer
