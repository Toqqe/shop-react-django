from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Addressess
from django.core.mail import send_mail

from dotenv import load_dotenv
import os
load_dotenv()

def send_mail_registration(user):
    subject = "Created account!"
    recipient = user.email
    from_email = os.environ.get('EMAIL_HOST_USER')
    message = f"""
    Thanks for creating account in our service! Here are account details:
    Login: {user.username}
    URL: site.com
    
    Regards!
    """
    
    send_mail(subject, message, from_email, [recipient])


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        new_profile = Addressess.objects.create(user=instance)
        new_profile.street = ""
        new_profile.city = ""
        new_profile.postal_code = ""
        new_profile.country = ""
        new_profile.save()
        send_mail_registration(instance)