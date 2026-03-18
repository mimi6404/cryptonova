from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    
    path('login/', auth_views.LoginView.as_view(
    template_name='accounts/login.html' 
    ), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('lessons/', views.lessons, name='lessons'),
    path('caesar-lab/', views.caesar_lab_view, name='caesar_lab'),
    path('mixed-lab/', views.mixed_lab_view, name='mixed_lab'),
    path('vigenere-lab/', views.vigenere_lab, name='vigenere_lab'),
    path('railfence-lab/', views.railfence_lab, name='railfence_lab'),
    path('columnar-lab/', views.columnar_lab, name='columnar_lab'),
    path('scytale-lab/', views.scytale_lab, name='scytale_lab'),
    path('aes-lab/', views.aes_lab, name='aes_lab'),
    path('des-lab/', views.des_lab, name='des_lab'),
    path('rsa-lab/', views.rsa_lab, name='rsa_lab'),
    path('3des-lab/', views.tripledes_lab, name='tripledes_lab'),
    path('diffie-hellman-lab/', views.diffie_hellman_lab, name='diffie_hellman_lab'),
    path('ecc-lab/', views.ecc_lab, name='ecc_lab'),
    path('twofish-lab/', views.twofish_lab, name='twofish_lab'),
    path('practicelab/', views.practicelab, name='practicelab'),
    path('quizzes/', views.quiz_list, name='quiz_list'),
    path("quiz/<int:quiz_id>/", views.take_quiz, name="take_quiz"),
    path("lesson/<int:lesson_id>/quizzes/", views.lesson_quizzes, name="lesson_quizzes"),
    path('discussion/', views.discussion, name='discussion'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile/', views.profile, name='profile'),
]