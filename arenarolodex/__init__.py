import itertools
import sys
import csv
import json
import logging
import os
from flask import Flask, request, render_template, url_for, send_from_directory, jsonify

app = Flask(__name__)

import arenarolodex.static
import arenarolodex.optionsgen
# import arenarolodex.start
# import arenarolodex.prep
import arenarolodex.base
import arenarolodex.Permute
import arenarolodex.ending


if __name__ == "__main__":
    app.debug = True
    app.run()


app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)
