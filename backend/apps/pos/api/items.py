from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.db.models import Subquery, OuterRef, Q
from django.utils import timezone
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.pos.serializers import (
    ItemSerailizer,
    ItemPriceSerializer,
    PriceListSerializer,
    CreateItemSerializer,
)
from apps.pos.models.item import Item, ItemPrice, PriceList


DEFAULT_PRICE_LIST = "93c8f3e9-0e8d-41c8-9f31-7c45cbb50544"


class ItemList(APIView):
    def get(self, *args, **kwargs):
        price_list = self.request.GET.get("price_list")
        if not price_list:
            price_list = PriceList.objects.all().order_by("created_at").first()
        else:
            price_list = PriceList.objects.get(id=price_list)

        itemprice_query = (
            ItemPrice.objects.filter(
                item=OuterRef("id"),
                price_list=price_list,
                valid_from__lte=timezone.now().date(),
            )
            .filter(Q(valid_to__isnull=True) | Q(valid_to__gte=timezone.now().date()))
            .order_by("-valid_from")
            .values("price")[:1]
        )

        items_queryset = (
            Item.objects.annotate(price=Subquery(itemprice_query))
            .prefetch_related("item_variant")
            .order_by("-updated_at")
        )

        serializer = ItemSerailizer(
            items_queryset, many=True, context={"request": self.request}
        )

        return Response({"items": serializer.data})

    def post(self, request):
        serializer = CreateItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        item = get_object_or_404(Item, id=id)
        serializer = CreateItemSerializer(
            data=request.data, instance=item, partial=True
        )

        if serializer.is_valid():
            serializer.update()

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PriceListAPIView(APIView):
    def get(self, *args, **kwargs):
        price_list = PriceList.objects.all()
        serializer = PriceListSerializer(price_list, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, *args, **kwargs):
        serializer = PriceListSerializer(data=self.request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        price_list = get_object_or_404(PriceList, id=id)
        serializer = PriceListSerializer(data=request.data, instance=price_list)

        if serializer.is_valid():
            serializer.update(instance=price_list)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemPriceAPIView(APIView):
    def get(self, *args, **kwargs):
        item_price = ItemPrice.objects.all()
        serializer = ItemPriceSerializer(item_price, many=True)
        return Response(data=serializer.data)

    def post(self, *args, **kwargs):
        serializer = ItemPriceSerializer(data=self.request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        item_price = get_object_or_404(ItemPrice, id=id)
        serializer = ItemPriceSerializer(data=request.data, instance=item_price)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        item_price = get_object_or_404(ItemPrice, id=id)
        item_price.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
