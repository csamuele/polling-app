from django.http import HttpRequest
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .keycloak_config import keycloak_openid
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .serializers import TokenResponseSerializer

def redirect_to_keycloak_login(request):
    return redirect('http://localhost:8080/realms/polling-app/protocol/openid-connect/auth?client_id=polling-app-backend&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2F&scope=openid+profile+email&response_type=code&state=AVWPSpZ9XN5D0Cu5')
def redirect_to_keycloak_logout(request):
    return redirect('http://localhost:8080/realms/polling-app/protocol/openid-connect/logout?redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2Foidc%2Fkeycloak%2Flogout%2Fcallback%2F')

