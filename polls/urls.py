from django.conf.urls import url

from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    url(r'^$', views.empty_url, name='index'),
	url(r'result', views.index, name='calc'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)