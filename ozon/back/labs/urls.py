"""labs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from ozon import views as ozon_views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'category', ozon_views.CategoryViewSet)
router.register(r'product', ozon_views.ProductViewSet, basename='product')
router.register(r'user', ozon_views.UserViewSet)
router.register(r'cart', ozon_views.CartViewSet, basename='cart')
router.register(r'minmax', ozon_views.MinMaxViewSet, basename='minmax')
router.register(r'sell', ozon_views.SellViewSet, basename='sell')
router.register(r'purchase', ozon_views.PurchaseViewSet, basename='purchase')
router.register(r'status_info', ozon_views.PurchaseStatusViewSet, basename='status_info')


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
