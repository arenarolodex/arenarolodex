import itertools
import sys
import csv
import json
import logging
import os
import pandas as pd
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app

from lhsrequest import update_options2

logging.basicConfig(level=logging.DEBUG)

@app.route('/results', methods = ['GET', 'POST'])
def index_post():
    update_options2()

    mylist, teachers, blocks = [], [], []
    for i in range(1,9):
        mylist.append(request.form['block' + str(i)])
        teachers.append(request.form['teach' + str(i)])
        blocks.append(request.form['pref' + str(i)])
        print(request.form['block' + str(i)])
        print(request.form['teach' + str(i)])
        print(request.form['pref' + str(i)])

    # This holds the preferred teachers and blocks for each class
    courseguide = []
    for c in range(len(mylist)):
        if mylist[c] =="":
            continue
        else:
            courseguide.append({"class":mylist[c], "teacher":teachers[c], "block":blocks[c]})

    # Filter out blanks
    mylist = list(itertools.filterfalse(lambda x: x == "", mylist))
    teachers = list(itertools.filterfalse(lambda x: x == "", teachers))
    blocks = list(itertools.filterfalse(lambda x: x == "", blocks))
    print("User inputted " + str(len(mylist)) + " courses")
    for c in mylist:
        print(c)
    print("User inputted " + str(len(teachers)) + " preferred teachers")
    print("User inputted " + str(len(blocks)) + " preferred blocks")

    if len(mylist) == 0:
        return render_template('landing.html')
    else:
        # Make a 2d list of all course offerings for courses person asked for
        courses = []
        for x in range(len(mylist)):
            courses.append([])

        # Open announcer, and for each course requested, pull out all courses
        # with the same name requested
        announcer = []
        with open ('options2.csv', "r") as f_in:
            reading = csv.reader(f_in, delimiter=',', quotechar='\"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
            announcer = list(reading)
        for i in range(len(courses)):
            print("Looking for " + str(mylist[i]) + "...")
            for row in announcer:
                if row[1] == mylist[i]:
                    courses[i].append(row)
                    # print(row)
            print("Found " + str(len(courses[i])) + " matches")

        # Check if the length of each list is 1; if so, guarantee that block
        for course in courses:
            if len(course) == 1:
                for c in courses:
                    # For each course, we're going to sort out the block
                    c = list(itertools.filterfalse(lambda x: x[3] == course[0][3] and x != course[0], course))
                print("Course " + course[0][1] + " was cleaned of intersections")
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
            for i in range(indexes):
                schedule = list(sched_input)

                block_intersect = False
                # Loop and look for block conflict
                for course in schedule:
                    if course[3] == courses[len(schedule)][i][3]:
                        block_intersect = True
                        break
                    # If there are no seats left, don't include
                    if course[5] == "0":
                        block_intersect = True
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

        # Make combinations
        schedule_maker(course_indexes[0])

        # Sort by number of preferred teachers
        def count_teachers(schedule):
            count = 0
            block = True
            for course in schedule:
                # print("Now checking "+course[1]+" for block "+course[3])
                # If this coincides with the preferred off block, lower priority
                if course[3] == request.form['off-block']:
                    block = False
                for c in courseguide:
                    if course[1] == c["class"]:
                        if c["teacher"] == course[2]:
                            print("teacher match for "+course[1])
                            count+=1
                        if c["block"] == course[3]:
                            print("block match for "+course[1])
                            count+=1
            if block and request.form['off-block-points'] != 'base':
                count+=int(request.form['off-block-points'])
            schedule.append(count)
            return count

        combinations = sorted(combinations, key=count_teachers, reverse=True)

        # Write all combinations to csv and return
        with open ('filelanding.csv', 'w', newline='') as f_out:
            writing = csv.writer(f_out, delimiter=',', quotechar='\"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
            writing.writerow(["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "Pref Score"])
            for schedule in combinations:
                row = ["","","","","","","","",""]

                score = schedule[len(schedule)-1]
                del schedule[len(schedule)-1]

                schedule = sorted(schedule, key=lambda x: x[5])
                for course in schedule:
                    row[int(course[3])-1] = "Block " + course[3] + ": " + course[1] +\
                                            " " + course[2] + ", " + course[5] + " seats left"
                row[8] = score
                writing.writerow(row)
            print(str(len(combinations)) + " schedules were written to filelanding.csv")

        filename = 'filelanding.csv'
        data = pd.read_csv(filename, delimiter=',')

        data.to_csv('fileoutput.csv')
        return render_template('landing.html')
