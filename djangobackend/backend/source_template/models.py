from django.db import models

class FormTemplate(models.Model):
    source = models.CharField(unique=True, blank=False, max_length=256, primary_key=True)
    template = models.TextField(blank=False)

class FormSubmission(models.Model):
    form_type = models.ForeignKey(FormTemplate, on_delete=models.PROTECT)
    form_data = models.TextField(blank=False)
