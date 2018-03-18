import itertools
import sys
import csv
import json
import logging
import os
import pandas as pd
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app

# app = Flask(__name__)


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

    if all(v == "" for v in mylist):
        return render_template('landing.html')
    else:
        # Make a 2d list of all course offerings for courses person asked for
        courses = [[],[],[],[],[],[],[],[]]
        announcer = csv.reader(open('announcer.csv', "rb"), delimiter=",")
        for i in range(len(mylist)):
            for row in announcer:
                if row[2] == mylist[i]:
                    courses[i].push(row);

        # Check if the length of each list is 1; if so, guarantee that block
        for course in courses:
            if len(course) == 1:
                for c in courses:
                    # for each course, we're going to sort out the block
                    c = ifilterfalse(lambda x: x[5] == course[0][5])

        # Create big list of combinations of classes
        

        valued = list(itertools.permutations(mylist))
        output = list(map(list, zip(*valued)))

        with open ('filelanding.csv', 'w', newline='') as f_out:
            writing = csv.writer(f_out, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
            # writing.writerow(headers)
            writing.writerow(["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"])


            # writing.writerows(valued)



        # with open ('filelanding.csv', 'r', newline='') as f_out_1, open ('fileoutput.csv', 'w', newline='') as f_out_2:
        #     read = csv.reader(f_out_1, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        #     write = csv.writer(f_out_2, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')



        filename = 'filelanding.csv'
        data = pd.read_csv(filename, delimiter=',')


        if check1 != None:
            data['C1'] = data[output[0]]

        if check2 != None:
            data['C2'] = data[output[1]]

        if check3 != None:
            data['C3'] = data[output[2]]

        if check4 != None:
            data['C4'] = data[output[3]]

        if check5 != None:
            data['C5'] = data[output[4]]

        if check6 != None:
            data['C6'] = data[output[5]]

        if check7 != None:
            data['C7'] = data[output[6]]

        if check8 != None:
            data['C8'] = data[output[7]]



        data.to_csv('fileoutput.csv')

        # data1 = pd.read_csv('fileoutput.csv')
        # for x in data:
        #     y = data.index(x)
        #     if checklist[y] != None:

        # data.ix[~(data[data.index[[0]]] == mylist[y])]


        if check1 != None and checklist[1:] == None:
            data1.ix[~(data1.iloc[:0] < 5040)]
        # if check2 != None:
        #     data.ix[~(data['C2'] == block2)]
        # if check3 != None:
        #     data.ix[~(data['C3'] == block3)]
        # if check4 != None:
        #     data.ix[~(data['C4'] == block4)]
        # if check5 != None:
        #     data.ix[~(data['C5'] == block5)]
        # if check6 != None:
        #     data.ix[~(data['C6'] == block6)]
        # if check7 != None:
        #     data.ix[~(data['C7'] == block7)]
        # if check8 != None:
        #     data.ix[~(data['C8'] == block8)]


        data1.to_csv('output.csv')

            # for row in read:
            #     if block1 in row:
            #         write.writerow(row[:])




            # if all(w == "x" for w in row):
            #     if(row.index(w) == 0):

































        # y = 0
        #     if (x != None for x in checklist):
        #         while x <= checklist.length:
        #             if checklist.index(x) == y:
        #                 writing.writerow()


            # for row in read:
            #     if checklist[:1] != None and checklist[1:] == None:
            #         write.writerow((block1, row[0], row[1], row[2], row[3], row[4], row[5], row[6]))
            #     if checklist[:2] != None and checklist[2:] == None:
            #         write.writerow((block1, block2, row[0], row[1], row[2], row[3], row[4], row[5]))
            #     if checklist[:3] != None and checklist[3:] == None:
            #         write.writerow((block1, block2, block3, row[0], row[1], row[2], row[3], row[4]))
            #     if checklist[:4] != None and checklist[4:] == None:
            #         write.writerow((block1, block2, block3, block4, row[3], row[4], row[5], row[6]))
            #     if checklist[:5] != None and checklist[5:] == None:
            #         write.writerow((block1, block2, block3, block4, block5, row[4], row[5], row[6]))
            #     if checklist[:6] != None and checklist[6:] == None:
            #         write.writerow((block1, block2, block3, block4, block5, block6, row[5], row[6]))
            #     if checklist[:7] != None and checklist[7:] == None:
            #         write.writerow((block1, block2, block3, block4, block5, block6, block7, row[6]))
            #     if checklist[:8] != None and checklist[8:] == None:
            #         write.writerow((block1, block2, block3, block4, block5, block6, block7, block8))

            #     if checklist[1:2] != None and checklist[2:] == None:
            #         write.writerow((row[0], block2, row[1], row[2], row[3], row[4], row[5], row[6]))
            #     if checklist[1:3] != None and checklist[3:] == None:
            #         write.writerow((row[0], block2, block3, row[2], row[3], row[4], row[5], row[6]))
            #     if checklist[1:4] != None and checklist[4:] == None:
            #         write.writerow((row[0], block2, block3, block4, row[3], row[4], row[5], row[6]))
            #     if checklist[1:5] != None and checklist[5:] == None:
            #         write.writerow((row[0], block2, block3, block4, block5, row[4], row[5], row[6]))
            #     if checklist[1:6] != None and checklist[6:] == None:
            #         write.writerow((row[0], block2, block3, block4, block5, block6, row[5], row[6]))
            #     if checklist[1:7] != None and checklist[7:] == None:
            #         write.writerow((row[0], block2, block3, block4, block5, block6, block7, row[6]))
            #     if checklist[1:8] != None and checklist[8:] == None:
            #         write.writerow((row[0], block2, block3, block4, block5, block6, block7, block8))

            #     if checklist[2:3] != None and checklist[3:] == None:
            #         write.writerow((row[0], row[1], block3, row[2], row[3], row[4], row[5], row[6]))
            #     if checklist[2:4] != None and checklist[4:] == None:
            #         write.writerow((row[0], row[1], block3, block4, row[3], row[4], row[5], row[6]))
            #     if checklist[2:5] != None and checklist[5:] == None:
            #         write.writerow((row[0], row[1], block3, block4, block5, row[4], row[5], row[6]))
            #     if checklist[2:6] != None and checklist[6:] == None:
            #         write.writerow((row[0], row[1], block3, block4, block5, block6, row[5], row[6]))
            #     if checklist[2:7] != None and checklist[7:] == None:
            #         write.writerow((row[0], row[1], block3, block4, block5, block6, block7, row[6]))
            #     if checklist[2:8] != None and checklist[8:] == None:
            #         write.writerow((row[0], row[1], block3, block4, block5, block6, block7, block8))

            #     if checklist[3:4] != None and checklist[4:] == None:
            #         write.writerow((row[0], row[1], row[2], block4, row[3], row[4], row[5], row[6]))
            #     if checklist[3:5] != None and checklist[5:] == None:
            #         write.writerow((row[0], row[1], row[2], block4, block5, row[4], row[5], row[6]))
            #     if checklist[3:6] != None and checklist[6:] == None:
            #         write.writerow((row[0], row[1], row[2], block4, block5, block6, row[5], row[6]))
            #     if checklist[3:7] != None and checklist[7:] == None:
            #         write.writerow((row[0], row[1], row[2], block4, block5, block6, block7, row[6]))
            #     if checklist[3:8] != None and checklist[8:] == None:
            #         write.writerow((row[0], row[1], row[2], block4, block5, block6, block7, block8))

            #     if check5 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], block5, row[4], row[5], row[6]))
            #     if check5 != None and check6 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], block5, block6, row[5], row[6]))
            #     if check5 != None and check6 != None and check7 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], block5, block6, block7, row[6]))
            #     if check5 != None and check6 != None and check7 != None and check8 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], block5, block6, block7, block8))

            #     if check6 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], row[4], block6, row[5], row[6]))
            #     if check6 != None and check7 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], row[4], block6, block7, row[6]))
            #     if check6 != None and check7 != None and check8 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], row[4], block6, block7, block8))

            #     if check7 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], row[4], row[5], block7, row[6]))
            #     if check7 != None and check8 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], row[4], row[5], block7, block8))

            #     if check8 != None:
            #         write.writerow((row[0], row[1], row[2], row[3], row[4], row[5], row[6], block8))





                # if check2 != None:
                #     write.writerow((row[0], block2, row[1], row[2], row[3], row[4], row[5], row[6]))
                # if check3 != None:
                #     write.writerow((row[0], row[0], block3, row[2], row[3], row[4], row[5], row[6]))
                # if check4 != None:
                #     write.writerow((row[0], row[0], row[1], block4, row[3], row[4], row[5], row[6]))
                # if check5 != None:
                #     write.writerow((row[0], row[0], row[1], row[2], block5, row[4], row[5], row[6]))
                # if check6 != None:
                #     write.writerow((row[0], row[0], row[1], row[2], row[3], block6, row[5], row[6]))
                # if check7 != None:
                #     write.writerow((row[0], row[0], row[1], row[2], row[3], row[4], block7, row[6]))
                # if check8 != None:
                #     write.writerow((row[0], row[0], row[1], row[2], row[3], row[4], row[5], block8))


            # if (x != None for x in checklist):
            #     # next(f_in)
            #     for row in read and y in valued:
            #         writing.writerow(block1,)


            # for y in checklist
            # json.dump(ret, f)
        return render_template('landing.html')

#     with open ('arenarolodex/announcer.csv', 'r') as g, open ('announcer1.csv', 'w') as i:
#         announce = csv.reader(g, delimiter = ',')
#         write = csv.writer(i, delimiter = ',')

#         next(g)
#         for row in announce:
#             # might be writerow
#             write.writerow((row[0], row[2], row[5], row[7]))






    # with open ('filelanding.csv', 'r', newline='') as f_in, open('fileoutput.csv', 'wb') as f_out:
    #     writer = csv.writer(f_out, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

    #     for row in csv.reader(f_in, delimiter=','):
    #         if row[0] != "a":
    #             writer.writerows(row)
    #             (print ("testing"))


    # index_post.has_been_called = True
    # pass
    # rowcleaner()

# index_post.has_been_called = False



# def rowcleaner():
#     with open ('filelanding.csv', 'r', newline='') as f_in, open('fileoutput.csv', 'wb') as f_out:
#         writer = csv.writer(f_out, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

#         for row in csv.reader(f_in, delimiter=','):
#             if row[0] != "a":
#                 writer.writerows(row)
#                 (print ("testing"))




# if __name__ == "__main__":
#     app.debug = True
#     app.run()


# app.logger.addHandler(logging.StreamHandler(sys.stdout))
# app.logger.setLevel(logging.ERROR)


# print (index_post)
# if index_post.has_been_called:
#     s = "Testing"
#     print (s)
#     rowcleaner()
