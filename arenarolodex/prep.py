import itertools
import sys
import csv
import json
import logging
import os
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app


@app.route('/results', methods=['GET', 'POST'])
def block_retriever():
#     app.logger.debug('This block of code was reached. congrats')
#     block1 = request.form['block1']
#     block2 = request.form['block2']
#     block3 = request.form['block3']
#     block4 = request.form['block4']
#     block5 = request.form['block5']
#     block6 = request.form['block6']
#     block7 = request.form['block7']
#     block8 = request.form['block8']

#     # retrieved = block1 + ',' + block2 + ',' + block3 + ',' + block4 + ',' + block5 + ',' + block6 + ',' + block7 + ',' + block8
    
#     with open ('arenarolodex/announcer.csv', 'r') as g, open ('announcer1.csv', 'w') as i:
#         announce = csv.reader(g, delimiter = ',')
#         write = csv.writer(i, delimiter = ',')

#         next(g)
#         for row in announce:
#             # might be writerow
#             write.writerow((row[0], row[2], row[5], row[7]))


    # with open ('announcer1.csv', 'r') as p, open ('announcer2.csv', 'w') as j:
    #     writ = csv.writer(j, delimiter = ',')

    #     for row in p:
    #         if (row[1]) == block1 or block2 or block3 or block4 or block5 or block6 or block7 or block8:
    #             writ.writerow(row)


    # with open ('announcer1.csv', 'r') as j_in, open ('holder.csv', 'w') as k, open ('static/options.json', 'w') as h:
    #     names = ["math", "english", "science", "history", "vpa", "language", "pe", "others"]
    #     fieldnames = ("")
    #     read = csv.reader(j_in, delimiter = ',')
    #     # reading = csv.DictReader(j_in, fieldnames)
    #     temp = csv.writer(k, delimiter = ',')

    #     d = 0
    #     c = d+1
    #     e = str(c)

    #     for row in read:
    #         if row[0] == e and d < 2:
    #             fieldnames = (names[d])
    #             # might be writerow
    #             temp.writerows(row[1], row[2], row[3])
    #             reading = csv.DictReader(k, fieldnames)
    #             for r in reading:
    #                 json.dump(r, h)
    #                 h.write('\n')

    #                 d += 1
    #                 break #maybe continue

    #         else:
    #             break



# @app.route('/results', methods = ['GET', 'POST'])
# def announce_json():
#     with open ('announcer2.csv', 'r') as j_in, open ('holder.csv', 'w') as k, open ('reference.json', 'w') as h:
#         names = ["math", "english", "science", "history", "vpa", "language", "pe", "others"]
#         fieldnames = ("")
#         read = csv.reader(j_in, delimiter = ',')
#         # reading = csv.DictReader(j_in, fieldnames)
#         temp = csv.writer(k, delimiter = ',')

#         d = 0
#         c = d+1
#         e = str(c)

#         for row in read:
#             if row[0] == e and d < 2:
#                 fieldnames = (names[d])
#                 # might be writerow
#                 temp.writerows(row[1], row[2], row[3])
#                 reading = csv.DictReader(k, fieldnames)
#                 for r in reading:
#                     json.dump(r, h)
#                     h.write('\n')

#                     d += 1
#                     break #maybe continue

#             else:
#                 break