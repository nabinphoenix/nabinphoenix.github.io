@echo off
echo Starting Fish Detection Backend...
cd /d "c:\Users\A S U S\FISH DECTECT\backend"
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
