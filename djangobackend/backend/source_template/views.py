from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import *

class SelectFormView(APIView):

    def get(self, request):
        sources = [templates.source for templates in FormTemplate.objects.all()]
        resp = Response(sources)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp

    def post(self, request):
        # json object from frontend
        # {"source_name": "source1"}
        source = FormTemplate.objects.get(source=request.data['source_name'])
        return Response(source.template)

class RenderedFormView(APIView):

    def post(self, request):
        # json object from frontend
        # {"source_name": "source1", "form_data": "sample payload json string"}
        try:
            FormSubmission.objects.create(form_type=FormTemplate.objects.get(source=request.data['source_name']), form_data=request.data['form_data'])
            return Response(True)
        except:
            return Response(False)
