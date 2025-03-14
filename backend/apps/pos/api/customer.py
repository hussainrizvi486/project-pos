from rest_framework.views import APIView
from rest_framework.response import Response
from apps.pos.models import Customer
from apps.pos.serializers import CustomerListSerializer


class CustomerAPIView(APIView):
    def get(self, *args, **kwargs):
        queryset = Customer.objects.all()
        serializer = CustomerListSerializer(queryset, many=True)
        return Response(data=serializer.data)

    def post(self, request):
        return Response("Hello, World!")

    def put(self, request):
        return Response("Hello, World!")

    def delete(self, request):
        return Response("Hello, World!")
