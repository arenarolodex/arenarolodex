import itertools
import sys
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
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
    return mylist

value = list(itertools.permutations(index_post()))
# sys.stdout = open("Test.txt", "w")
# print (value)
# print ("Test")


filename  = open("Test.txt","w")
sys.stdout = filename
print (value)
