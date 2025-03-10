from rest_framework.decorators import api_view
from apps.pos.serializers import POSInvoiceSerializer, POSInvoiceListSerializer
from apps.pos.models.invoice import POSInvoice
from rest_framework.views import APIView
from apps.pos.models import Customer
from rest_framework import status
from rest_framework.response import Response


@api_view(["POST"])
def create_invoice(request):
    data = request.data
    serializer = POSInvoiceSerializer(data=data, context={"request": request})

    if serializer.is_valid():
        invoice = serializer.save()
        return Response(
            data={"message": "order created successfully!", "invoice": invoice.id},
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InvoiceAPIView(APIView):
    def post(self, request):
        data = request.data
        serializer = POSInvoiceSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            return Response(
                data={"message": "order created successfully!"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, *args, **kwargs):
        invoices = POSInvoice.objects.all()
        serializer = POSInvoiceListSerializer(invoices, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
