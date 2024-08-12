
from django.urls import path

from Calculator.views import index

urlpatterns = [
    path('', index),
]