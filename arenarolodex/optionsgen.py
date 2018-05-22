import csv
import json
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app

from lhsrequest import update_options2

def course_generator():
    update_options2()

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

    announce=[]
    with open('options2.csv', "r") as g_in:
        temp = csv.reader(g_in, delimiter=',', quotechar='\"')
        announce = list(temp)
    for row in announce:
        if row[0] == "Department":
            continue
        else:
            found = False
            dept = course_list.get(course_dic.get(row[0]))
            for obj in dept:
                # Search department for the course, see if it exists
                if obj["name"] == row[1]:
                    found = True
                    found_teach = False
                    for teach in obj["teachers"]:
                        if teach["name"] == row[2]:
                            found_teach = True
                            teach["blocks"].append(row[3])
                    if found_teach == False:
                        obj["teachers"].append({"name":row[2], "blocks":[row[3]]})
            if found:
                continue
            else:
                course_list.get(course_dic.get(row[0])).append({"name":row[1],"teachers":[{"name":row[2], "blocks":[row[3]]}]})

    with open('options.json', 'w', newline='') as f_out:
        json.dump(course_list, f_out)

course_generator()

print ("Hewwo!")
