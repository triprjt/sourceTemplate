from django.contrib import admin
from .models import *


@admin.register(FormTemplate)
class FormTemplatesAdmin(admin.ModelAdmin):
    list_display = (
        "source",
    )
    search_fields = (
        "source",
    )

@admin.register(FormSubmission)
class FormSubmissionsAdmin(admin.ModelAdmin):
    list_display = (
        "form_type",
    )
    search_fields = (
        "form_type__source",
    )


