from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .keycloak_config import keycloak_openid
from rest_framework.request import Request
# from users.models import KeycloakUser
import logging


class KeycloakUser:
    def __init__(self, user_info):
        self.user_info = user_info
        self.sub = user_info.get('sub')
        self.username = user_info.get('preferred_username')
        self.email = user_info.get('email')
        self.first_name = user_info.get('given_name')
        self.last_name = user_info.get('family_name')

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return self.username


class KeycloakAuthentication(BaseAuthentication):
    def authenticate(self, request: Request):
        auth_header = request.headers.get('Authorization')
        logging.info(f'auth_header: {auth_header}')
        if not auth_header:
            return None

        try:
            # Extract token from header
            token = auth_header.split("Bearer ")[1]

            # Verify token
            user_info = keycloak_openid.userinfo(token)
            if not user_info:
                raise AuthenticationFailed('Invalid token')

            # Return a user object or user data and token as tuple
            user = KeycloakUser(user_info)
            return (user, token)
        except Exception as e:
            raise AuthenticationFailed(f'Authentication failed: {e}')
