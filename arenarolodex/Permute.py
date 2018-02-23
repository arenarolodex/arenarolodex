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
    app.logger.debug('This block of code was reached. congrats')
    block1 = request.form['block1']
    block2 = request.form['block2']
    block3 = request.form['block3']
    block4 = request.form['block4']
    block5 = request.form['block5']
    block6 = request.form['block6']
    block7 = request.form['block7']
    block8 = request.form['block8']

    check1 = request.form.get('check1')
    check2 = request.form.get('check2')
    check3 = request.form.get('check3')
    check4 = request.form.get('check4')
    check5 = request.form.get('check5')
    check6 = request.form.get('check6')
    check7 = request.form.get('check7')
    check8 = request.form.get('check8')

    mylist = [block1, block2, block3, block4, block5, block6, block7, block8]
    checklist = [check1, check2, check3, check4, check5, check6, check7, check8]
    mylist1 = []

    # for x in checklist:
    #     if x != True:
    #         mylist1.append(x)
    # if all(t != "" for t in mylist):
    #     mylist1.append(t)

    if mylist[0] != "" and check1 == None:
        mylist1.append(block1)
    if mylist[1] != "" and check2 == None:
        mylist1.append(block2)
    if mylist[2] != "" and check3 == None:
        mylist1.append(block3)
    if mylist[3] != "" and check4 == None:
        mylist1.append(block4)
    if mylist[4] != "" and check5 == None:
        mylist1.append(block5)
    if mylist[5] != "" and check6 == None:
        mylist1.append(block6)
    if mylist[6] != "" and check7 == None:
        mylist1.append(block7)
    if mylist[7] != "" and check8 == None:
        mylist1.append(block8)


    if all(v == "" for v in mylist):
        return render_template('landing.html')
    else:
         # global valued
        valued = list(itertools.permutations(mylist))

        with open ('arenarolodex/filelanding.csv', 'w', newline='') as f_out:
            writing = csv.writer(f_out, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
            writing.writerow(["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"])
            writing.writerows(valued)



        # with open ('filelanding.csv', 'r', newline='') as f_out_1, open ('fileoutput.csv', 'w', newline='') as f_out_2:
        #     read = csv.reader(f_out_1, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        #     write = csv.writer(f_out_2, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')



        filename = 'filelanding.csv'
        data = pd.read_csv(filename)
        data.to_csv('fileoutput.csv')

        data1 = pd.read_csv('fileoutput.csv')
        # for x in data:
        #     y = data.index(x)
        #     if checklist[y] != None:
        
        # data.ix[~(data[data.index[[0]]] == mylist[y])]


        if check1 != None and checklist[1:] == None:
            s = data.ix[data['C1'] == block1]
            s
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


        data.to_csv('output.csv')

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
