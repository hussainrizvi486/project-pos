from django.urls import path
from .api import ItemList, CategoryAPIView

urlpatterns = [
    path("api/items", ItemList.as_view()),
    path("api/category", CategoryAPIView.as_view()),
]
