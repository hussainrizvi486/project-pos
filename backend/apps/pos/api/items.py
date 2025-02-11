from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Subquery, OuterRef
from django.utils import timezone
from apps.pos.serializers import ItemSerailizer
from apps.pos.models.item import Item, ItemPrice


class ItemList(APIView):
    def get(self, request):

        itemprice_query = (
            ItemPrice.objects.filter(
                item=OuterRef("pk"),
                valid_from__lte=timezone.now().date(),
                valid_to__gte=timezone.now().date(),
            )
            .order_by("-valid_from")
            .values("price")[:1]
        )

        items_queryset = Item.objects.annotate(
            price=Subquery(itemprice_query)
        ).prefetch_related("item_variant")

        serializer = ItemSerailizer(
            items_queryset, many=True, context={"request": request}
        )
        return Response({"items": serializer.data})
