import itertools
import sys
import csv
import json
import logging
import os
import pandas as pd
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app

logging.basicConfig(level=logging.DEBUG)

course_list = []
announcer = list(csv.reader(open('arenarolodex/announcer.csv', "r"), delimiter=","))
for row in announcer:
    if row[0] == "Department Number":
        continue
    if int(row[0]) > len(course_list):
        course_list.append([])
    try:
        course_list[int(row[0])-1].index(row[2])
        continue
    except ValueError:
        course_list[int(row[0])-1].append(row[2])

with open ('courselist.json', 'w', newline='') as f_out:
    json.dump(course_list, f_out)

@app.route('/results', methods = ['GET', 'POST'])
def index_post():
    block1 = request.form['block1']
    block2 = request.form['block2']
    block3 = request.form['block3']
    block4 = request.form['block4']
    block5 = request.form['block5']
    block6 = request.form['block6']
    block7 = request.form['block7']
    block8 = request.form['block8']

    mylist = [block1, block2, block3, block4, block5, block6, block7, block8]

    # Filter out blanks
    mylist = list(itertools.filterfalse(lambda x: x == "", mylist))
    print("User inputted "+str(len(mylist))+" courses")

    if len(mylist) == 0:
        return render_template('landing.html')
    else:
        # Make a 2d list of all course offerings for courses person asked for
        courses = []
        for x in range(len(mylist)):
            courses.append([])

        # Open announcer, and for each course requested, pull out all courses
        # with the same name requested
        announcer = list(csv.reader(open('arenarolodex/announcer.csv', "r"), delimiter=","))
        for i in range(len(courses)):
            print("Looking for "+str(mylist[i])+"...")
            for row in announcer:
                if row[2] == mylist[i]:
                    courses[i].append(row);
                    # print(row)
            print("Found "+str(len(courses[i]))+" matches")

        # Check if the length of each list is 1; if so, guarantee that block
        for course in courses:
            if len(course) == 1:
                for c in courses:
                    # For each course, we're going to sort out the block
                    c = list(itertools.filterfalse(lambda x: x[5] == course[0][5], course))
            if len(course) == 0:
                # If there are no course options, remove the course
                courses.remove(course)

        # Make a new list of how many options of each course there is
        course_indexes = []
        for course in courses:
            course_indexes.append(int(len(course)))

        combinations = []

        # Recursive function that will go through every possibility and append it
        # if it works
        def schedule_maker(indexes, sched_input = []):
            for i in range(indexes-1):
                schedule = list(sched_input)
                block_intersect = False
                # Loop and look for block conflict
                for course in schedule:
                    if course[5] == courses[len(schedule)][i][5]:
                        block_intersect = True
                        break
                if block_intersect:
                    # If the block is the same, go to the next course
                    continue
                schedule.append(courses[len(schedule)][i])

                if len(schedule) < len(courses):
                    # Recursive call
                    schedule_maker(course_indexes[len(schedule)], schedule)
                else:
                    # If the schedule is complete, add it to combinations
                    combinations.append(schedule)
                    return

        # Make combinations
        schedule_maker(course_indexes[0])

        # Write all combinations to csv and return
        with open ('filelanding.csv', 'w', newline='') as f_out:
            writing = csv.writer(f_out, delimiter=',', quotechar='\"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
            writing.writerow(["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"])
            for schedule in combinations:
                row = ["","","","","","","",""]
                schedule = sorted(schedule, key=lambda x: x[5])
                for course in schedule:
                    row[int(course[5])-1] = "Block "+course[5]+": "+course[2]+" "+course[7]
                writing.writerow(row)
                print(row)
            print(str(len(combinations))+" schedules were written to filelanding.csv")

        filename = 'filelanding.csv'
        data = pd.read_csv(filename, delimiter=',')

        data.to_csv('fileoutput.csv')
        return render_template('landing.html')
