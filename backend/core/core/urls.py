from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Authentication
    path('', include('django.contrib.auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # Users URLS
    path('email/resend/', views.EmailResend.as_view(), name='email-resend'),
    path('email/delete/<pk>/', views.EmailDelete.as_view(), name='email-delete'),
]
