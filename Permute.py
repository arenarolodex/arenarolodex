import itertools
import sys
from flask import Flask, request, render_template

app = Flask(__name__)
#app.debug = True

@app.route('/')
def index():
    return render_template('my-form.html')

@app.route('/template', methods=['POST'])
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
    #global valued
    valued = list(itertools.permutations(mylist))
    ret = '\n'.join(', '.join(elems) for elems in valued)
    return ret


# sys.stdout = open("Test.txt", "w")
# print (value)
# print ("Test")

if __name__ == "__main__":
    app.run()

print (index_post)



# filename  = open("Test.txt","w")
# sys.stdout = filename
