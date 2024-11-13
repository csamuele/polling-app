from argparse import Action
import re
import stat
from drf_spectacular.utils import extend_schema
from django.shortcuts import  get_object_or_404

# Create your views here.
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt


from .models import Question, Choice, Vote
from rest_framework import permissions, viewsets, generics, status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from users.authentication import KeycloakAuthentication
from rest_framework.views import APIView

from .serializers import ChoiceReadSerializer, QuestionReadSerializer, ChoiceWriteSerializer, CreateVoteSerializer, QuestionWriteSerializer, VoteSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request: HttpRequest, view, obj) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user.sub


    

class QuestionViewSet(viewsets.ModelViewSet):
    """
    Question endpoints.
    """
    queryset = Question.objects.all()
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return QuestionReadSerializer
        return QuestionWriteSerializer

@extend_schema(
    responses={200: QuestionReadSerializer(many=True)}
)
class UserQuestionsView(APIView):
    """
    Endpoint for questions created by the user.
    """
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        questions = Question.objects.filter(owner=request.user.sub)
        serializer = QuestionReadSerializer(questions, many=True, context={'request': request})
        return Response(serializer.data)




class QuestionChoicesView(generics.ListCreateAPIView):
    """
    API endpoint that returns all the choices for a particular question.
    """
    serializer_class = ChoiceReadSerializer

    def get_queryset(self):
        question = get_object_or_404(Question, pk=self.kwargs["pk"])
        return question.choices.all()

class VoteView(APIView):
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        request=CreateVoteSerializer,
        responses={200: CreateVoteSerializer}
    )
    def put(self, request, *args, **kwargs):
        vote_id = self.kwargs["pk"]
        vote = get_object_or_404(Vote, pk=vote_id, owner=request.user.sub)
        data = {
            "choices": request.data.get("choices"),
            "owner": request.user.sub
        }
        return self._save_vote(data, instance=vote, status=200)

    def _save_vote(self, data, instance: Vote, status=200):
        serializer = CreateVoteSerializer(instance, data=data, context={'request': self.request, 'question': instance.question}) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status)
        return Response(serializer.errors, status=400)
    def delete(self, request, *args, **kwargs):
        vote_id = self.kwargs["pk"]
        vote = get_object_or_404(Vote, pk=vote_id, owner=request.user.sub)
        vote.delete()
        return Response(status=204)

class UserVotesView(APIView):
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        responses={200: VoteSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        votes = Vote.objects.filter(owner=request.user.sub)
        serializer = VoteSerializer(votes, many=True, context={'request': request})
        return Response(serializer.data)

class CreateVoteView(APIView):
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        request=CreateVoteSerializer,
        responses={201: CreateVoteSerializer}
    )
    def post(self, request, *args, **kwargs):
        question_id = self.kwargs["pk"]
        question = get_object_or_404(Question, pk=question_id)
        data = {
            "choices": request.data.get("choices"),
            "owner": request.user.sub
        }

        serializer = CreateVoteSerializer(data=data, context={'request': self.request, 'question': question})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

