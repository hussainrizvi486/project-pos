from django.urls import path
from .api import (
    ItemList,
    CategoryAPIView,
    PriceListAPIView,
    InvoiceAPIView,
    ItemPriceAPIView,
)
from .api.invoice import create_invoice
from .api.customer import CustomerAPIView
from .api.uom import UOMAPIView

from .api.queries import main as queries

urlpatterns = [
    path("api/query/category", queries.CategoryQuery.as_view()),
    path("api/query/uom", queries.UOMQuery.as_view()),
    path("api/items", ItemList.as_view()),
    path("api/uom", UOMAPIView.as_view()),
    path("api/price-list", PriceListAPIView.as_view()),
    path("api/uom/<str:id>", UOMAPIView.as_view()),
    path("api/item-price", ItemPriceAPIView.as_view()),
    path("api/item-price/<str:id>", ItemPriceAPIView.as_view()),
    path("api/customer", CustomerAPIView.as_view()),
    path("api/invoice", InvoiceAPIView.as_view()),
    path("api/order/create", create_invoice),
    path("api/category", CategoryAPIView.as_view()),
]
