import itertools
import sys
import csv
import json
import logging
import os
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify
from arenarolodex import app


@app.route('/')
def start():
    return render_template('start.html')


@app.route('/templates/index.html', methods=['GET', 'POST'])
def button_retriever():
    button = request.form['button']
    if button == "start":
        import arenarolodex.prep