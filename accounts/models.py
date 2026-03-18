from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, default='student')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


# Category
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


# Lesson
class Lesson(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    theory = models.TextField()
    example = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Quiz
class Quiz(models.Model):

    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)

    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lesson.title} - {self.level}"


# Question
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    text = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    correct_answer = models.IntegerField()


# Quiz Result
class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField()
    taken_at = models.DateTimeField(auto_now_add=True)



class DiscussionPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at}"
    
class Reply(models.Model):
    post = models.ForeignKey(DiscussionPost, on_delete=models.CASCADE, related_name='replies')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.user.username}"    

class QuizProgress(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    passed = models.BooleanField(default=False)

    score = models.IntegerField(default=0)

    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}"
    
class Certificate(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    issued_at = models.DateTimeField(auto_now_add=True)        
    
class Badge(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)

    earned_at = models.DateTimeField(auto_now_add=True)    