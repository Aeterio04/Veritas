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

@api_view(['POST'])
@permission_classes([AllowAny])
def loginfunc(request):

    email = request.data.get("email")
    password = request.data.get("password")
    print(email,password)
    return JsonResponse({"status":"success","message":"Login successful"})




# Create your views here.
