from drf_spectacular.extensions import OpenApiAuthenticationExtension


class KeycloakAuthenticationExtension(OpenApiAuthenticationExtension):
    # Path to your authentication class
    target_class = 'users.authentication.KeycloakAuthentication'
    # Name to display in the OpenAPI schema
    name = 'KeycloakAuthentication'  # Name to display in the OpenAPI schema

    def get_security_definition(self, auto_schema):
        return {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
