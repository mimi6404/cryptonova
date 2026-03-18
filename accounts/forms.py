from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    username = forms.CharField(
        max_length=20,                   # <-- الحد الجديد
        error_messages={
            'max_length': "Username must be less than 20 characters.",
            'required': "Username is required."
        },
        widget=forms.TextInput(attrs={'placeholder': 'Enter username'})
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
