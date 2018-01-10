import itertools
import sys
import csv
import json
import logging
import os
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/static/<path:path>', methods = ['GET', 'POST'])
def send_static(path):
    return send_from_directory('static', path)


@app.route('/results', methods=['GET', 'POST'])
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
    
    with open ('announcer.csv', 'r') as g, open ('announcer1.csv', 'w') as i, open ('announcer2.csv', 'w') as j:
        announce = csv.reader(g, delimiter = ',')
        write = csv.writer(i, delimiter = ',')
        writ = csv.writer(j, delimiter = ',')

        for row in announce:
            # might be writerow
            write.writerows(row[0], row[2], row[5], row[7])

        for row in write:
            if row[1] == block1 or block2 or block3 or block4 or block5 or block6 or block7 or block8:
                writ.writerow(row)


@app.route('/results', methods = ['GET', 'POST'])
def announce_json():
    with open ('announcer2.csv', 'r') as j_in, open ('holder.csv', 'w') as k, open ('reference.json', 'w') as h:
        names = ["math", "english", "science", "history", "vpa", "language", "pe", "others"]
        fieldnames = ("")
        read = csv.reader(j_in, delimiter = ',')
        # reading = csv.DictReader(j_in, fieldnames)
        temp = csv.writer(k, delimiter = ',')

        
        for row in read:
            d = 0
            c = d+1
            e = str(c)

            if row[0] == e and d < 2:
                fieldnames = (names[d])
                # might be writerow
                temp.writerows(row[1], row[2], row[3])
                reading = csv.DictReader(k, fieldnames)
                for r in reading:
                    json.dump(r, h)
                    h.write('\n')

                    d += 1
                    break #maybe continue

            else:
                break


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

    mylist = [block1, block2, block3, block4, block5, block6, block7, block8]

    mylist1 = []

    for x in mylist:
        if x != "":
            mylist1.append(x)
    # if all(t != "" for t in mylist):
    #     mylist1.append(t)


    # if mylist[0] != "":
    #     mylist1.append(block1)
    # if mylist[1] != "":
    #     mylist1.append(block2)
    # if mylist[2] != "":
    #     mylist1.append(block3)
    # if mylist[3] != "":
    #     mylist1.append(block4)
    # if mylist[4] != "":
    #     mylist1.append(block5)
    # if mylist[5] != "":
    #     mylist1.append(block6)
    # if mylist[6] != "":
    #     mylist1.append(block7)
    # if mylist[7] != "":
    #     mylist1.append(block8)


    if all(v == "" for v in mylist):
        return render_template('landing.html')
    else:
         # global valued
        valued = list(itertools.permutations(mylist1))

        with open ('filelanding.csv', 'w', newline='') as f_in:
            writing = csv.writer(f_in, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
            writing.writerows(valued)
            # json.dump(ret, f)
        return render_template('landing.html')


    index_post.has_been_called = True
    pass

index_post.has_been_called = False



@app.route('/results', methods = ['GET', 'POST'])
def rowcleaner():
    with open ('filelanding.csv', 'r', newline='') as f_in, open('fileoutput.csv', 'wb') as f_out:
        writer = csv.writer(f_out, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

        for row in csv.reader(f_in, delimiter=','):
            if row[0] != "a":
                writer.writerows(row)
                (print ("testing"))




if __name__ == "__main__":
    app.debug = True
    app.run()


app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)


print (index_post)
if index_post.has_been_called:
    s = "Testing"
    print (s)
    rowcleaner()
