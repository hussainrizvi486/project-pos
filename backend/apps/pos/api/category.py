from rest_framework.views import APIView
from rest_framework.response import Response
from  apps.pos.models.item import Category
from apps.pos.serializers import CategorySerializer


class CategoryAPIView(APIView):
    def get(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response({"data": serializer.data})     
        


        