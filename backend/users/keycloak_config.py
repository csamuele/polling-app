from keycloak import KeycloakOpenID
from django.conf import settings

keycloak_openid = KeycloakOpenID(
    server_url=settings.KEYCLOAK_CONFIG['server_url'],
    client_id=settings.KEYCLOAK_CONFIG['client_id'],
    realm_name=settings.KEYCLOAK_CONFIG['realm_name'],
    client_secret_key=settings.KEYCLOAK_CONFIG['client_secret_key'],
)
