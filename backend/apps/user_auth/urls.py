from django.urls import path
from .api import LoginAPIView, UserAPIView

urlpatterns = [
    path("api/login", LoginAPIView.as_view()),
    path("api/user/detail", UserAPIView.as_view()),
]
