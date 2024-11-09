from codecs import lookup
from random import choice
from .models import Question, Choice
from rest_framework import serializers


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ["id", "choice_text", "votes", "question"]


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(
        many=True,
        read_only=True,
    )
    class Meta:
        model = Question
        fields = ["id", "question_text", "pub_date", "choices"]
        read_only_fields = ['owner']
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user.sub
        return super().create(validated_data)

