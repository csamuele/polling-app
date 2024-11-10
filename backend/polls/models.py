from django.db import models
from django.utils import timezone
import datetime
# from users.models import KeycloakUser
from django.conf import settings



class Question(models.Model):
    owner = models.CharField(max_length=50)
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    def __str__(self):
        return self.choice_text

class Vote(models.Model):
    question = models.ForeignKey(Question, related_name='votes', on_delete=models.CASCADE)
    choices = models.ManyToManyField(Choice, related_name='votes')
    owner = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.owner} voted on {self.question.question_text}'