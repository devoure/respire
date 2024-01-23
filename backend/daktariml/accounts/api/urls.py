from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/add', views.add_user, name="add-user"),
    path('users/<str:pk>/', views.get_user, name="get-user"),
    path('profiles/', views.get_profiles, name="get-profiles"),
    path('profiles/<str:pk>/', views.get_profile, name="get-profile"),
]
