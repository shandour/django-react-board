from rest_framework import generics
from rest_framework.response import Response

from .models import Card, TaskSatuses
from .serializers import CardSerializer


class DisplayCards(generics.ListCreateAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(assignee=self.request.user)

    def get(self, request):
        queryset = self.get_queryset()

        data = {
            'to_do': CardSerializer(
                queryset.filter(status=TaskSatuses.TO_DO.value),
                many=True
            ).data,
            'in_progress': CardSerializer(
                queryset.filter(
                    status=TaskSatuses.IN_PROGRESS.value),
                many=True
            ).data,
            'done': CardSerializer(
                queryset.filter(status=TaskSatuses.DONE.value),
                many=True
            ).data,
        }

        return Response(data)


class ManipulateCards(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    queryset = Card.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['check_ownership'] = True

        return context
