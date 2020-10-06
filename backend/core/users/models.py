from allauth.account.signals import email_confirmed
from allauth.account.models import EmailAddress
from django.contrib.auth.models import User, AbstractUser
from django.db import models
from django.dispatch import receiver


class User(AbstractUser):
    """ Custom User model """
    email_verified = models.BooleanField(default=False)

    @receiver(email_confirmed)
    def update_user_email(sender, request, email_address, **kwargs):
        """ Once the email address is confirmed, make new email_address primary.
        This also sets user.email to the new email address.
        email_address is an instance of allauth.account.models.EmailAddress
        """
        email_address.set_as_primary()
        # Get rid of old email addresses
        stale_addresses = EmailAddress.objects.filter(
            user=email_address.user).exclude(primary=True).delete()

        # Set local model email_verified status
        email_address.user.email_verified = True
        email_address.user.save()

    @property
    def email_addresses(self):
        """ Return list of all associated email address from all-auth model
        """
        emails = EmailAddress.objects.filter(user=self)
        return(emails)
