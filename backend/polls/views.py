from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from requests import Session


from .models import Question, Choice
from rest_framework import permissions, viewsets, generics
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from .serializers import QuestionSerializer, ChoiceSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request: HttpRequest, view, obj) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that returns the 5 most recent questions.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [OAuth2Authentication, SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

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
    

