from django.conf.urls import include, url
from django.contrib import admin
import math
urlpatterns = [
    url(r'^polls/', include('polls.urls')),
	url(r'^calc/', include('polls.urls')),
]