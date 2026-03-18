from django.contrib import admin
from .models import (
    Profile, Category, Lesson, Quiz, Question, QuizResult,
    DiscussionPost, Reply, QuizProgress, Certificate, Badge
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'created_at')
    search_fields = ('user__username', 'role')
    list_filter = ('role',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    search_fields = ('title', 'category__name')
    list_filter = ('category',)


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'lesson', 'level', 'created_at')
    search_fields = ('title', 'lesson__title')
    list_filter = ('level', 'lesson__category', 'lesson')
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('short_text', 'quiz', 'correct_answer')
    search_fields = ('text', 'quiz__title', 'quiz__lesson__title')
    list_filter = ('quiz__level', 'quiz__lesson', 'quiz__lesson__category')

    def short_text(self, obj):
        return obj.text[:50]
    short_text.short_description = 'Question'


@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'taken_at')
    search_fields = ('user__username', 'quiz__title')
    list_filter = ('quiz__level', 'taken_at')


@admin.register(QuizProgress)
class QuizProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'passed', 'score', 'completed_at')
    search_fields = ('user__username', 'quiz__title')
    list_filter = ('passed', 'quiz__level', 'completed_at')


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'issued_at')
    search_fields = ('user__username', 'lesson__title')
    list_filter = ('issued_at',)


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'name', 'earned_at')
    search_fields = ('user__username', 'lesson__title', 'name')
    list_filter = ('earned_at', 'lesson')


@admin.register(DiscussionPost)
class DiscussionPostAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'short_content')
    search_fields = ('user__username', 'content')
    list_filter = ('created_at',)

    def short_content(self, obj):
        return obj.content[:50]
    short_content.short_description = 'Content'


@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'created_at', 'short_content')
    search_fields = ('user__username', 'content')
    list_filter = ('created_at',)

    def short_content(self, obj):
        return obj.content[:50]
    short_content.short_description = 'Content'