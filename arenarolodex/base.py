from flask import Flask, request, render_template
from arenarolodex import app

@app.route('/', methods = ['GET', 'POST'])
def index():
    return render_template('index.html')

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0, no-cache, no-store, must-revalidate'
    return r


# @app.route('/index', methods=['GET', 'POST'])
# def button1_retrieve():
#     button1 = request.form['button1']
#     if button1 == "Enter":
#         import arenarolodex.Permute
