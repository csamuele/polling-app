from argparse import Action
from drf_spectacular.utils import extend_schema
from django.shortcuts import  get_object_or_404

# Create your views here.
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt


from .models import Question, Choice
from rest_framework import permissions, viewsets, generics
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from users.authentication import KeycloakAuthentication
from rest_framework.views import APIView

from .serializers import QuestionSerializer, ChoiceSerializer

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
    serializer_class = QuestionSerializer
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        user_id = self.request.user.sub
        serializer.save(owner=user_id)

@extend_schema(
    responses={200: QuestionSerializer(many=True)}
)
class UserQuestionsView(APIView):
    """
    Endpoint for questions created by the user.
    """
    authentication_classes = [SessionAuthentication, KeycloakAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        questions = Question.objects.filter(owner=request.user.sub)
        serializer = QuestionSerializer(questions, many=True, context={'request': request})
        return Response(serializer.data)


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
    

