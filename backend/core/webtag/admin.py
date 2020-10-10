from django.contrib import admin
from .models import LinkGroup, Link
# Register your models here.


class LinkGroupAdmin(admin.ModelAdmin):
    pass


admin.site.register(Link)
admin.site.register(LinkGroup, LinkGroupAdmin)
