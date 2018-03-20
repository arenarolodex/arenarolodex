from flask import Flask, request, send_file
from arenarolodex import app

@app.route('/fileoutput.csv', methods = ['GET', 'POST'])
def send_landing():
    return send_file('../fileoutput.csv')

@app.route('/options.json', methods = ['GET', 'POST'])
def send_courses():
    return send_file('../options.json')
