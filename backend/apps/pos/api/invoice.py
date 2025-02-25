from rest_framework.decorators import api_view
from apps.pos.serializers import POSInvoiceSerailizer
from rest_framework.views import APIView
from apps.pos.models import Customer
from rest_framework import status
from rest_framework.response import Response


@api_view(["POST"])
def create_invoice(request):
    data = request.data
    serializer = POSInvoiceSerailizer(data=data, context={"request": request})

    if serializer.is_valid():
        return Response(
            data={"message": "order created successfully!"},
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InvoiceAPIView(APIView):
    def post(self, request):
        data = request.data
        serializer = POSInvoiceSerailizer(data=data, context={"request": request})

        if serializer.is_valid():
            return Response(
                data={"message": "order created successfully!"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, *args, **kwargs): ...
