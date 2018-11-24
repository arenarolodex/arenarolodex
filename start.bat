@echo off
title arenarolodex
echo Running server...
set FLASK_APP=arenarolodex
set FLASK_ENV=development
flask run

:End
cmd /k