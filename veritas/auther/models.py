from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=[('university', 'University'), ('admin', 'Admin')])
    institution_name = models.CharField(max_length=255, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name', 'role']

    def __str__(self):
        return self.email
# Create your models here.
