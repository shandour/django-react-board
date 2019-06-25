from django.urls import path, include

from .views import DisplayCards, ManipulateCards

card_patterns = [
    path('', DisplayCards.as_view()),
    path('<uuid:pk>/', ManipulateCards.as_view())
]

urlpatterns = [
    path('cards/', include(card_patterns))
]
