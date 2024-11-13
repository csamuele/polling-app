from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"questions", views.QuestionViewSet, basename="question")

urlpatterns = [
    path("", include(router.urls)),
    path('questions/<int:pk>/choices/', views.QuestionChoicesView.as_view(), name="question-choices"),
    path('user-questions/', views.UserQuestionsView.as_view(), name="user-questions"),
    path('questions/<int:pk>/vote/', views.CreateVoteView.as_view(), name="create-vote"),
    path('user-votes/', views.UserVotesView.as_view(), name="user-votes"),
    path('votes/<int:pk>/', views.VoteView.as_view(), name="vote-detail"),
]