from django.urls import path, include

from cards.urls import urlpatterns as card_url_patterns
from users.urls import urlpatterns as user_url_patterns

api_patterns = card_url_patterns + user_url_patterns

urlpatterns = [
    path('api/', include(api_patterns)),
]
