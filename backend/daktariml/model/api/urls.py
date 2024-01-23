from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.get_predict, name="predict"),
    path('predictions/<str:pk>/', views.get_predictions, name="get-predictions")
]
