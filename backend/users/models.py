from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models

class KeycloakUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)

# class KeycloakUser(AbstractBaseUser, PermissionsMixin):
#     sub = models.CharField(max_length=50, unique=True, primary_key=True)
#     username = models.CharField(max_length=150, unique=True)
#     email = models.EmailField(blank=True, null=True)
#     first_name = models.CharField(max_length=30, blank=True, null=True)
#     last_name = models.CharField(max_length=30, blank=True, null=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = KeycloakUserManager()

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = []

#     groups = models.ManyToManyField(
#         Group,
#         related_name='keycloakuser_set',  # Change the related_name to avoid clashes
#         blank=True,
#     )
#     user_permissions = models.ManyToManyField(
#         Permission,
#         related_name='keycloakuser_set',  # Change the related_name to avoid clashes
#         blank=True,
#     )

#     def __str__(self):
#         return self.username