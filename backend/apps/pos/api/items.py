from rest_framework.views import APIView
from rest_framework.response import Response

from apps.pos.serializers import ItemSerailizer
from apps.pos.models.item import Item


class ItemList(APIView):
    def get(self, request):        
        items_queryset = Item.objects.all().prefetch_related("item_variant")
        serializer = ItemSerailizer(items_queryset, many=True)
        return Response({"items": serializer.data})

