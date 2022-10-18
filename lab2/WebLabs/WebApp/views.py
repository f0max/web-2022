from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from WebApp.models import Product, Category

# Create your views here.


def productList(request):
    return render(request, 'products.html', {'data': {
        'current_date': date.today(),
        'products': Product.objects.all()
    }})


def GetProduct(request, id):
    return render(request, 'product.html', {'data': {
        'current_date': date.today(),
        'product': Product.objects.filter(product_id=id)[0]
    }})
