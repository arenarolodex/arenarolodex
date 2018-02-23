from flask import Flask, request, send_file
from arenarolodex import app

@app.route('/filelanding.csv', methods = ['GET', 'POST'])
def send_landing():
    return send_file('../filelanding.csv')