from django.urls import path
from .api import ItemList, CategoryAPIView, PriceListAPIView
from .api.invoice import create_invoice

urlpatterns = [
    path("api/items", ItemList.as_view()),
    path("api/price-list", PriceListAPIView.as_view()),
    path("api/order/create", create_invoice),
    path("api/category", CategoryAPIView.as_view()),
]
