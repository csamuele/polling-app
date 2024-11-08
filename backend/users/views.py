from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer

def redirect_to_keycloak_login(request):
    return redirect('http://localhost:8080/realms/polling-app/protocol/openid-connect/auth?client_id=polling-app-backend&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2F&scope=openid+profile+email&response_type=code&state=AVWPSpZ9XN5D0Cu5')
def redirect_to_keycloak_logout(request):
    return redirect('http://localhost:8080/realms/polling-app/protocol/openid-connect/logout?redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2Foidc%2Fkeycloak%2Flogout%2Fcallback%2F')