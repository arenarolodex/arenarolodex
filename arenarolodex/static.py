from flask import Flask, request, send_from_directory
from arenarolodex import app

@app.route('/static/<path:path>', methods = ['GET', 'POST'])
def send_static(path):
    return send_from_directory('static', path)