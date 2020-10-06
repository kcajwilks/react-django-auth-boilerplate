from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

UserAdmin.fieldsets += ('Custom fields set', {'fields': ('email_verified',)}),

admin.site.register(User, UserAdmin)
