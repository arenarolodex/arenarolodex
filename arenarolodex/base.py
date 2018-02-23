from flask import Flask, request, render_template
from arenarolodex import app

@app.route('/', methods = ['GET', 'POST'])
def index():
    return render_template('index.html')


# @app.route('/index', methods=['GET', 'POST'])
# def button1_retrieve():
#     button1 = request.form['button1']
#     if button1 == "Enter":
#         import arenarolodex.Permute