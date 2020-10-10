from django.contrib.auth import get_user_model
from django.conf import settings
from allauth.account.models import EmailAddress
from allauth.account.utils import cleanup_email_addresses
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer

# Get the UserModel
UserModel = get_user_model()


class EmailAddressSerializer(serializers.ModelSerializer):
    # Used for obj prermissions
    owner = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = EmailAddress
        fields = '__all__'


class CustomUserDetailsSerializer(UserDetailsSerializer):
    """ Used to include email is verified """

    # Property in models.py and use EmailAddress Serializer above.
    email_addresses = EmailAddressSerializer(
        many=True, required=False, allow_null=True)

    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name',
                  'last_name', 'email_addresses', 'email_verified')

        read_only_fields = ('username', 'email_addresses')

    def get_validation_exclusions(self):
        exclusions = super(FavoriteListSerializer,
                           self).get_validation_exclusions()
        return exclusions + ['username']

    def update(self, instance, validated_data):
        # Remove email from validated_data
        new_email = validated_data.pop('email', None)

        # Continue with normal update
        user = super(CustomUserDetailsSerializer, self).update(
            instance, validated_data)
        # Handle email update with verification
        if new_email:
            context = self.context
            request = context.get('request', None)
            if request:
                EmailAddress_count = EmailAddress.objects.filter(
                    user=user).count()
                EmailAddress.objects.add_email(
                    request, user, new_email, confirm=True)

        return user
