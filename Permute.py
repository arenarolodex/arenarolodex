import itertools
import sys
from flask import Flask, request, render_template, url_for, jsonify
import csv
import json
import logging


app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/template', methods=['GET', 'POST'])
def block_retriever():
    app.logger.debug('This block of code was reached. congrats')
    block1 = request.form['block1']
    block2 = request.form['block2']
    block3 = request.form['block3']
    block4 = request.form['block4']
    block5 = request.form['block5']
    block6 = request.form['block6']
    block7 = request.form['block7']
    block8 = request.form['block8']

    retrieved = block1 + ',' + block2 + ',' + block3 + ',' + block4 + ',' + block5 + ',' + block6 + ',' + block7 + ',' + block8
    return retrieved



@app.route('/template', methods=['GET', 'POST'])
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

    mylist = [block1, block2, block3, block4, block5, block6, block7, block8]
    
    mylist1 = []

    if mylist[0] != "":
        mylist1.append(block1)
    if mylist[1] != "":
        mylist1.append(block2)
    if mylist[2] != "":
        mylist1.append(block3)
    if mylist[3] != "":
        mylist1.append(block4)
    if mylist[4] != "":
        mylist1.append(block5)
    if mylist[5] != "":
        mylist1.append(block6)
    if mylist[6] != "":
        mylist1.append(block7)
    if mylist[7] != "":
        mylist1.append(block8)
    # global valued
    valued = list(itertools.permutations(mylist1))
    # ret = '</br>'.join(', '.join(elems) for elems in valued)
    # ret = '\n'.join(', '.join(elems) for elems in valued)
    # return ret
    # return jsonify(valued)

    # for elems in valued
    #     part = []
    #     for 

    with open ('filelanding.csv', 'w', newline='') as f_in:
        writing = csv.writer(f_in, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        writing.writerows(valued)
        # json.dump(ret, f)
    return render_template('landing.html')



def rowcleaner():
    with open ('filelanding.csv', 'r', newline='') as f_in, with open('fileoutput.csv', 'w') as f_out, with open('announcer.csv', 'r') as ref:
        writer = csv.writer(f_out, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        
        for row in csv.reader(f_in, delimiter=','):
            if row[0] != "a":
                writer.writerow(row)



# def setclassadder():




# @app.route('/')
# def tester():
#     return url_for(index)







# sys.stdout = open("Test.txt", "w")
# print (value)
# print ("Test")

if __name__ == "__main__":
    app.debug = True
    app.run()


app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)


print (index_post)
rowcleaner()
# print (tester)


# filename  = open("Test.txt","w")
# sys.stdout = filename
