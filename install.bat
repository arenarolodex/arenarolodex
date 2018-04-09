echo off
title arenarolodex server

set FLASK_APP=arenarolodex
pip install -r requirements.txt
pip install -e .
