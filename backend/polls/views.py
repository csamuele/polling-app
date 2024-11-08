from argparse import Action
from multiprocessing import context
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt


from .models import Question, Choice
from rest_framework import permissions, viewsets, generics
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from users.authentication import KeycloakAuthentication

from .serializers import QuestionSerializer, ChoiceSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request: HttpRequest, view, obj) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user.sub

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that returns the 5 most recent questions.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.sub)



class ChoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows choices to be viewed or edited.
    """
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class QuestionChoicesView(generics.ListCreateAPIView):
    """
    API endpoint that returns all the choices for a particular question.
    """
    serializer_class = ChoiceSerializer

    def get_queryset(self):
        question = get_object_or_404(Question, pk=self.kwargs["pk"])
        return question.choices.all()
    

