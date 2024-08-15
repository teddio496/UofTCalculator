
from django.urls import path

from Calculator.views import index, save_request


urlpatterns = [
    path('', index, name='index'),  # Home page
    path('save/', save_request, name='save_request'),  # URL for saving grades
]