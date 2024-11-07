from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"questions", views.QuestionViewSet, basename="question")
router.register(r"choices", views.ChoiceViewSet, basename="choice")

urlpatterns = [
    path("", include(router.urls)),
    path('questions/<int:pk>/choices/', views.QuestionChoicesView.as_view(), name="question-choices"),
]