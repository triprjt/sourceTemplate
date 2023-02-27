from django.urls import path, include
from source_template import views

urlpatterns = [
    path("select-source/", views.SelectFormView.as_view(), name="select-form"),
    path("form/", views.RenderedFormView.as_view(), name="rendered-form"),
]
