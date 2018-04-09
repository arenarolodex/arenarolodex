import csv
import json
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app

def course_generator():
    course_list = {
        "math": [],
        "english": [],
        "science": [],
        "history": [],
        "vpa": [],
        "language": [],
        "pe": [],
        "others": []
    }
    course_dic = {
        "1":"math",
        "2":"science",
        "3":"english",
        "4":"history",
        "5":"vpa",
        "6":"language",
        "7":"pe",
        "8":"others"
    }
    announce = list(csv.reader(open('arenarolodex/announcer.csv', "r"), delimiter=","))
    for row in announce:
        if row[0] == "Department Number":
            continue
        else:
            try:
                course_list.get(course_dic.get(row[0])).index(row[2])
                continue
            except ValueError:
                course_list.get(course_dic.get(row[0])).append(row[2])

    with open ('options.json', 'w', newline='') as f_out:
        json.dump(course_list, f_out)

course_generator()

print ("Successsssss!")
