from codecs import lookup
from os import read, write
from random import choice, choices
from tkinter import NO

from httpx import request
from .models import Question, Choice, Vote
from rest_framework import serializers
from rest_framework.request import Request


class ChoiceWriteSerializer(serializers.ModelSerializer):
    votes = serializers.SerializerMethodField()
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Choice
        read_only_fields = ['question']
        fields = ['id', 'question', "choice_text", "votes" ]

    def get_votes(self, obj) -> int:
        return obj.votes.count()
    
class ChoiceReadSerializer(serializers.ModelSerializer):
    votes = serializers.SerializerMethodField()
    class Meta:
        model = Choice
        read_only_fields = ['question']
        fields = ['id', 'question', "choice_text", "votes" ]

    def get_votes(self, obj) -> int:
        return obj.votes.count()
class QuestionReadSerializer(serializers.ModelSerializer):
    choices = ChoiceReadSerializer(many=True)
    votes = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ["id", "question_text", "pub_date", "choices", "votes"]
        read_only_fields = ['owner']

    def get_votes(self, obj) -> int:
        return obj.votes.count()
class QuestionWriteSerializer(serializers.ModelSerializer):
    choices = ChoiceWriteSerializer(many=True)
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
                    choice.save()
                else:
                    Choice.objects.create(question=instance, **choice_data)

        return super().update(instance, validated_data)



class CreateVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'question', 'choices', 'owner']
        read_only_fields = ['owner', 'id', 'question']
        

    def validate(self, data):
        request: Request = self.context['request']
        user = request.user.sub
        question = self.context['question']
        choices = data['choices']
        data['question'] = question
        # Check if the user has already voted for this question
        # if Vote.objects.filter(question_id=question_id, owner=user).exists():
        #     raise serializers.ValidationError("You have already voted for this question.")

        # Check if there are duplicate choices
        choice_ids = [choice.id for choice in choices]
        if len(choice_ids) != len(set(choice_ids)):
            raise serializers.ValidationError("You cannot vote for the same choice twice.")

        return data

    def create(self, validated_data):
        request: Request = self.context['request']
        question: Question = validated_data['question']
        choices = validated_data['choices']
        owner = self.context['request'].user.sub
        vote = Vote.objects.create(question=question, owner=owner)
        vote.choices.set(choices)
        return vote
    
class VoteSerializer(serializers.ModelSerializer):
    question = QuestionReadSerializer()
    choices = ChoiceReadSerializer(many=True)
    class Meta:
        model = Vote
        fields = ['id', 'question', 'choices', 'owner']
        read_only_fields = ['owner', 'id']

 