from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model


from .serializers import UserSerializer

User = get_user_model()


class Registration(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []
    queryset = User.objects.all()

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)

            return Response(
                {
                    'user': UserSerializer(instance=user).data,
                    'token': token.key
                },
                status=201
            )
        else:
            return Response(serializer.errors, status=400)


class GetCurrentUser(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        return Response(UserSerializer(instance=self.request.user).data)
