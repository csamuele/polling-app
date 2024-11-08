from codecs import lookup
from random import choice
from .models import Question, Choice
from rest_framework import serializers


class ChoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Choice
        fields = ["url", "choice_text", "votes", "question"]
        extra_kwargs = {
            'question' : {
                'view_name': 'question-detail',
                'lookup_field': 'pk'
            }
        }

class QuestionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='owner.username')
    choices = ChoiceSerializer(
        many=True,
        read_only=True,
    )
    choices_url = serializers.HyperlinkedIdentityField(
        view_name='question-choices',
        lookup_field='pk'
    )
    class Meta:
        model = Question
        fields = ["url", "question_text", "pub_date", "choices", "choices_url", "user"]

