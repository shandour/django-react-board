from django.urls import path
from rest_framework.authtoken import views

from .views import Registration, GetCurrentUser


urlpatterns = [
    path('register/', Registration.as_view()),
    path('current-user/', GetCurrentUser.as_view()),
    path('login/', views.obtain_auth_token),
]
