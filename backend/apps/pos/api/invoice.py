from rest_framework.decorators import api_view
from apps.pos.serializers import POSInvoiceSerailizer
from apps.pos.models import Customer
from rest_framework import status
from rest_framework.response import Response


@api_view(["POST"])
def create_invoice(request):
    data = request.data
    data["customer"] = "1"
    serializer = POSInvoiceSerailizer(data=data)

    if serializer.is_valid():
        print(serializer.validated_data)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
