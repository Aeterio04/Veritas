from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from django.contrib.auth import authenticate,logout
from django.utils.text import slugify
from django.contrib.auth.hashers import check_password
from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from datetime import date,timedelta
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage
from .models import CustomUser

@api_view(['POST'])
@permission_classes([AllowAny])
def loginfunc(request):


    email = request.data.get("email")
    password = request.data.get("password")

    user=CustomUser.objects.filter(email=email).first()
    if user is None:
        return JsonResponse({"status": "error", "message": "Invalid email or password"}, status=400)
    if not user.check_password(password):
        return JsonResponse({"status": "error", "message": "Invalid email or password"}, status=400)
    token, created = Token.objects.get_or_create(user=user)
    return JsonResponse({"status": "success", "token": token.key, "user": {
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "institution_name": user.institution_name
    }})


@api_view(['POST'])
@permission_classes([AllowAny]) 
def signupfunc(request):
    email = request.data.get("email")
    password = request.data.get("password")
    data = request.data.get("userData")
    role ="university"
    institution_name = data.get("institute_name")
    username = data.get("full_name")

    if CustomUser.objects.filter(email=email).exists():
        return JsonResponse({"status": "error", "message": "Email already exists"}, status=400)

    user = CustomUser.objects.create_user(
        username=email,  # You can set username as email or any other unique identifier
        email=email,
        password=password,
        full_name=username,
        role=role,
        institution_name=institution_name
    )
    user.save()

    return JsonResponse({"status": "success", "message": "User registered successfully"})

@api_view(['GET'])
@permission_classes([AllowAny])
def getme(request):
    
    token_key = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    print("Auth header received:", token_key)
    try:
        token = Token.objects.get(key=token_key)
        user = token.user
        return JsonResponse({"status": "success", "user": {
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "institution_name": user.institution_name
        }})
    except Token.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Invalid token"}, status=400)


# Create your views here.
