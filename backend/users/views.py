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


# @extend_schema(
#     operation_id="Exchange Code for Token",
#     description="Exchanges an authorization code from Keycloak for an access token.",
#     parameters=[
#         OpenApiParameter(name="code", description="Authorization code", required=True, type=str),
#         OpenApiParameter(name="redirect_uri", description="Redirect URI matching Keycloak config", required=True, type=str),
#     ],
#     responses={200: TokenResponseSerializer},
# )
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def exchange_token(request: Request) -> Response:
#     """
#     takes token from frontend and exchanges it for a new token
#     """
#     auth_code = request.query_params.get('code')
#     redirect_uri = request.query_params.get('redirect_uri')
    
#     if not auth_code or not redirect_uri:
#         return Response({'error': 'code and redirect_uri are required'}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         token = keycloak_openid.token(
#             auth_code=auth_code,
#             grant_type='authorization_code',
#             redirect_uri=redirect_uri
#         )
#         return Response(token, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
