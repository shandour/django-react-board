from rest_framework import serializers

from .models import Card
from users.serializers import UserSerializer


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Card

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data['assignee'] = UserSerializer(obj.assignee).data

        return data

    def to_internal_value(self, data):
        request = self.context['request']
        check_ownership = self.context.get('check_ownership', False)

        if check_ownership and not Card.objects.filter(
                pk=data['id'], assignee=request.user):
            raise serializers.ValidationError({
                'non_field_error': 'You are not permitted to edit this card'
            })

        return super().to_internal_value(data)
