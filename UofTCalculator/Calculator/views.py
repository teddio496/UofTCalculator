# example/views.py
from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render






def calculate_grade(grades):
    total = 0
    total_weight = 0
    for grade in grades:
        weight = grade["weight"]
        marks = grade["marks"]
        outof = grade["outof"]
        total += round((marks/outof) * weight, 2)
        total_weight += weight
    return total

def save_request(request):
    #
    pass



grades = [
                {"name": "Labs", "weight": 15, "marks": 90, "outof": 100},
                {"name": "Project", "weight": 20, "marks": 90, "outof": 100},
                {"name": "Term Test", "weight": 30, "marks": 90, "outof": 100},
                {"name": "Final Exam", "weight": 35, "marks": 90, "outof": 100}
            ]

user_grade_data = {
            "CSCB07": [grades, calculate_grade(grades)], 
            "CSCB09": [grades, calculate_grade(grades)]
        }



def index(request):
    return render(request, "index.html", {"user_grade_data": user_grade_data})




# save grade
# checks whehter the weight sum to 100
    # check what other websites do when this happens
    # 
