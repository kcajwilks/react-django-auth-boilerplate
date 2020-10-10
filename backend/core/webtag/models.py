from django.conf import settings
from django.db import models
from django.db.models.signals import post_save


class LinkGroup(models.Model):
    # Fields
    name = models.CharField(max_length=50)

    # Common Fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Relation Fields
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = 'link_group'
        verbose_name_plural = 'link_groups'

    def __str__(self):
        return self.name

    # Create LinkGroup When users.models.User Is Created
    def post_save_receiver(sender, instance, created, **kwargs):
        # Creates a demo LinkGroup object and two related Link objects
        if created:
            link_group = LinkGroup.objects.create(
                owner=instance, name=f'Demo Group - {instance.username}')
            link_group.links.create(
                owner=instance, name='Django Documentation',
                url='https://docs.djangoproject.com/')
            link_group.links.create(
                owner=instance, name='React HomePage',
                url='https://reactjs.org/')

    # Connect the post_save signal
    post_save.connect(post_save_receiver, sender=settings.AUTH_USER_MODEL)


class Link(models.Model):
    # Fields
    name = models.CharField(max_length=50)
    url = models.URLField(max_length=200)

    # Common Fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Relation Fields
    link_group = models.ForeignKey(
        'LinkGroup', related_name='links', on_delete=models.CASCADE)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = 'link'
        verbose_name_plural = 'links'

    def __str__(self):
        return self.name
