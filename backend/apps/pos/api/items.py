from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.db.models import Subquery, OuterRef, Q
from django.utils import timezone
from apps.pos.serializers import ItemSerailizer, PriceListSerializer
from apps.pos.models.item import Item, ItemPrice, PriceList


DEFAULT_PRICE_LIST = "93c8f3e9-0e8d-41c8-9f31-7c45cbb50544"


class ItemList(APIView):
    def get(self, *args, **kwargs):
        price_list = self.request.GET.get("price_list")
        if not price_list:
            price_list = PriceList.objects.first()
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

        items_queryset = Item.objects.annotate(
            price=Subquery(itemprice_query)
        ).prefetch_related("item_variant")

        serializer = ItemSerailizer(
            items_queryset, many=True, context={"request": self.request}
        )

        return Response({"items": serializer.data})


class PriceListAPIView(ListAPIView):
    serializer_class = PriceListSerializer
    queryset = PriceList.objects.all()
