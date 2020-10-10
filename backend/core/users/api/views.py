from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.generics import get_object_or_404
from allauth.account.admin import EmailAddress
from allauth.account.utils import send_email_confirmation
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework import views
from .permissions import IsOwnerOrReadOnly
from .serializers import EmailAddressSerializer
from rest_framework import permissions


User = get_user_model()


class EmailResend(views.APIView):
    """
    Leverages allauth.account.utils.send_email_confirmation to resend
    an email verification. Requires 'email' as arg.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Takes email address and will resend email confirmation if
        the email exists and is not already verified.
        """
        _email = request.data['email']
        _user = get_object_or_404(EmailAddress, email=_email).user
        # Check if verified, return True or False
        emailAddress = EmailAddress.objects.filter(
            user=_user, email=_email, verified=True).exists()
        if emailAddress:
            return Response({'message': 'This email is already verified'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                # Resend Email confirmation
                email_address = get_object_or_404(
                    EmailAddress, user=_user, email=_email)
                email_address.send_confirmation(request)
                return Response({'message': 'Email confirmation sent'}, status=status.HTTP_201_CREATED)
            except APIException:
                return Response({'message': 'This email does not exist, please create a new account'}, status=status.HTTP_403_FORBIDDEN)


class EmailDelete(views.APIView):
    """
    Allows deletion of pending verification email i.e,
    if a user type in an incorrect email during changing
    of email addresses
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    def get_queryset(self):
        return EmailAddress.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()

        obj = get_object_or_404(EmailAddress, pk=self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)
        return obj

    def delete(self, request, pk):
        _email = self.get_object()

        try:
            _email.delete()
            return Response({'message': 'Email confirmation sent'}, status=status.HTTP_201_CREATED)
        except APIException:
            return Response({'message': 'Email address not found'}, status=status.HTTP_403_FORBIDDEN)
