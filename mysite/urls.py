from django.conf.urls import include, url
from django.contrib import admin
import math
urlpatterns = [
    url(r'^', include('polls.urls')),
	url(r'^result/', include('polls.urls')),
]