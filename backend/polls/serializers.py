from codecs import lookup
from os import read, write
from random import choice, choices
from tkinter import NO
from .models import Question, Choice
from rest_framework import serializers


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        read_only_fields = ['question', 'id']
        fields = ['id', 'question', "choice_text", "votes", ]




# class QuestionCreateSerializer(serializers.ModelSerializer):
#     choices = ChoiceSerializer(
#         many=True,
#         write_only=True,
#     )
    
#     class Meta:
#         model = Question
#         fields = ["id", "question_text", "pub_date", "choices"]
#         read_only_fields = ['owner']
#         write_only_fields = ['choices']

#     def create(self, validated_data):
#         choices_data = validated_data.pop('choices', [])
#         validated_data['owner'] = self.context['request'].user.sub
#         question = Question.objects.create(**validated_data)
#         for choice_data in choices_data:
#             Choice.objects.create(question=question, **choice_data)
#         return question
        
class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ["id", "question_text", "pub_date", "choices"]
        read_only_fields = ['owner']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices', [])
        validated_data['owner'] = self.context['request'].user.sub
        question = Question.objects.create(**validated_data)
        for choice_data in choices_data:
            Choice.objects.create(question=question, **choice_data)
        return question

    def update(self, instance, validated_data):
        choices_data = validated_data.pop('choices', None)
        if choices_data is not None:
            # Delete choices that are not in the request
            existing_choice_ids = [choice.id for choice in instance.choices.all()]
            new_choice_ids = [choice['id'] for choice in choices_data if 'id' in choice]
            for choice_id in existing_choice_ids:
                if choice_id not in new_choice_ids:
                    Choice.objects.filter(id=choice_id).delete()

            # Update or create choices
            for choice_data in choices_data:
                if 'id' in choice_data:
                    choice = Choice.objects.get(id=choice_data['id'])
                    choice.choice_text = choice_data['choice_text']
                    choice.votes = choice_data['votes']
                    choice.save()
                else:
                    Choice.objects.create(question=instance, **choice_data)

        return super().update(instance, validated_data)
