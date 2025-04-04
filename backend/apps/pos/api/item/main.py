from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.pos.models.item import Item
from apps.pos.serializers import ItemSerailizer


class ItemAPI(APIView):
    def get(self, *args, **kwargs):
        requst = self.request
        id = requst.GET.get("id")

        if not id:
            return Response(
                data={"message": "id is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        item_queryset = get_object_or_404(Item, id=id)
        serializer = ItemSerailizer(item_queryset, context={"request": requst})
        return Response(data=serializer.data, status=status.HTTP_200_OK)
