from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.shortcuts import get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Max, Count, Sum
from django.db.models import F
import random
from .models import (
    Quiz,
    Question,
    QuizResult,
    QuizProgress,
    Certificate,
    Badge,
    DiscussionPost,
    Reply,
    Lesson
)

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()   # نحفظ المستخدم
            login(request, user) # نسجل دخوله مباشرة
            return redirect('home')  # نوديه للصفحة الرئيسية
    else:
        form = RegisterForm()

    return render(request, 'accounts/register.html', {'form': form})


def home(request):
    return render(request, 'accounts/home.html')


def lessons(request):
    # ممكن نرسل قائمة الدروس لاحقًا من هنا
    lessons_data = [
        {
            'category': 'Symmetric Cryptography',
            'lessons': ['Caesar Cipher', 'Monoalphabetic Cipher', 'Vigenère Cipher', 'Rail Fence', 'Columnar Transposition']
        },
        {
            'category': 'Asymmetric Cryptography',
            'lessons': ['RSA', 'Diffie-Hellman']
        }
    ]
    return render(request, 'lessons/lessons.html')
def caesar_lab_view(request):
    return render(request, "lessons/caesar_lab.html")

def mixed_lab_view(request):
    return render(request, "lessons/mixed_lab.html")

def vigenere_lab(request):
    return render(request, "lessons/vigenere_lab.html")

def railfence_lab(request):
    return render(request, 'lessons/railfence_lab.html')

def columnar_lab(request):
    return render(request, 'lessons/columnar_lab.html')

def scytale_lab(request):
    return render(request, 'lessons/scytale_lab.html')

def aes_lab(request):
    return render(request, 'lessons/aes_lab.html')

def des_lab(request):
    return render(request, 'lessons/des_lab.html')

def rsa_lab(request):
    return render(request, 'lessons/rsa_lab.html')

def tripledes_lab(request):
    return render(request, 'lessons/tripledes_lab.html')

def diffie_hellman_lab(request):
    return render(request, 'lessons/diffie_hellman_lab.html')

def ecc_lab(request):
    return render(request, 'lessons/ecc_lab.html')

def twofish_lab(request):
    return render(request, 'lessons/twofish_lab.html')

def practicelab(request):
    return render(request, 'accounts/practicelab.html')

@login_required
def take_quiz(request, quiz_id):

    quiz = get_object_or_404(Quiz, id=quiz_id)

    # first time opening quiz
    if request.method == "GET":

        all_questions = Question.objects.filter(quiz=quiz)

        questions = random.sample(list(all_questions), min(5, all_questions.count()))

        # store question IDs in session
        request.session['quiz_questions'] = [q.id for q in questions]

    else:
        # load same questions from session
        question_ids = request.session.get('quiz_questions', [])
        questions = Question.objects.filter(id__in=question_ids)

    if request.method == "POST":

        score = 0
        results = []

        for question in questions:

            selected = request.POST.get(str(question.id))
            correct = question.correct_answer

            is_correct = selected and int(selected) == correct

            if is_correct:
                score += 1

            results.append({
                "question": question,
                "selected": int(selected) if selected else None,
                "correct": correct,
                "is_correct": is_correct
            })

        passed = score >= 3

        QuizResult.objects.create(
            user=request.user,
            quiz=quiz,
            score=score
        )

        QuizProgress.objects.create(
            user=request.user,
            quiz=quiz,
            score=score,
            passed=passed
        )

        if quiz.level.lower() == "advanced" and passed:

            Certificate.objects.get_or_create(
                user=request.user,
                lesson=quiz.lesson
            )

            Badge.objects.get_or_create(
                user=request.user,
                lesson=quiz.lesson,
                name=f"{quiz.lesson.title} Master"
            )

        return render(request, "quiz/quiz_result.html", {
            "quiz": quiz,
            "results": results,
            "score": score,
            "total": 5,
            "passed": passed
        })

    return render(request, "quiz/take_quiz.html", {
        "quiz": quiz,
        "questions": questions
    })

def quiz_list(request):

    lessons = Lesson.objects.all()

    return render(request, "quiz/quiz_list.html", {
        "lessons": lessons
    })

@login_required
def discussion(request):

    if request.method == "POST":

        # إضافة بوست جديد
        if "post_content" in request.POST:
            content = request.POST.get("post_content")
            if content:
                DiscussionPost.objects.create(
                    user=request.user,
                    content=content
                )

        # إضافة رد
        elif "reply_content" in request.POST:
            content = request.POST.get("reply_content")
            post_id = request.POST.get("post_id")

            if content and post_id:
                post = DiscussionPost.objects.get(id=post_id)
                Reply.objects.create(
                    post=post,
                    user=request.user,
                    content=content
                )

    posts = DiscussionPost.objects.all().order_by('-created_at')

    return render(request, "accounts/discussion.html", {"posts": posts})

@login_required
def dashboard(request):

    results = QuizResult.objects.filter(user=request.user)

    algorithm_stats = results.values('quiz__lesson__title') \
    .annotate(
        attempts=Count('id'),
        avg_score=Avg('score')
    )
    top_users = QuizResult.objects.values('user__username') \
        .annotate(total=Sum('score')) \
        .order_by('-total')[:3]
    
    user_rank = None

    for index, user in enumerate(top_users):
       if user['user__username'] == request.user.username:
        user_rank = index + 1
        break

    total_quizzes = results.count()
    total_score = results.aggregate(Sum('score'))['score__sum'] or 0
    highest_score = results.aggregate(Max('score'))['score__max'] or 0
    average_score = results.aggregate(Avg('score'))['score__avg'] or 0
    top_users = QuizResult.objects.values('user__username') \
        .annotate(total=Sum('score')) \
        .order_by('-total')[:3]

    context = {
        "total_quizzes": total_quizzes,
        "total_score": total_score,
        "highest_score": highest_score,
        "average_score": round(average_score, 2),
        "top_users": top_users,
        "context_algorithm": algorithm_stats,
        "user_rank": user_rank,
    }

    return render(request, "accounts/dashboard.html", context)


@login_required
def profile(request):

    user = request.user
    results = QuizResult.objects.filter(user=user)
    badges = Badge.objects.filter(user=user)
    total_quizzes = results.count()
    highest_score = results.aggregate(Max('score'))['score__max'] or 0

    # حساب ترتيب المستخدم
    all_users = QuizResult.objects.values('user') \
        .annotate(total=Sum('score')) \
        .order_by('-total')

    user_rank = None

    for index, u in enumerate(all_users):
        if u['user'] == user.id:
            user_rank = index + 1
            break

    context = {
        "user": user,
        "total_quizzes": total_quizzes,
        "highest_score": highest_score,
        "user_rank": user_rank,
         "badges": badges,
    }

    return render(request, "accounts/profile.html", context)
@login_required
def lesson_quizzes(request, lesson_id):

    lesson = get_object_or_404(Lesson, id=lesson_id)

    quizzes = Quiz.objects.filter(lesson=lesson)

    beginner_passed = QuizProgress.objects.filter(
        user=request.user,
        quiz__lesson=lesson,
        quiz__level="beginner",
        passed=True
    ).exists()

    intermediate_passed = QuizProgress.objects.filter(
        user=request.user,
        quiz__lesson=lesson,
        quiz__level="intermediate",
        passed=True
    ).exists()

    advanced_passed = QuizProgress.objects.filter(
        user=request.user,
        quiz__lesson=lesson,
        quiz__level="advanced",
        passed=True
    ).exists()

    return render(request, "quiz/quiz_levels.html", {
        "lesson": lesson,
        "quizzes": quizzes,
        "beginner_passed": beginner_passed,
        "intermediate_passed": intermediate_passed,
        "advanced_passed": advanced_passed
    })
