@echo off
echo **** Installing the required Node.js packages. ****
call npm install --no-optional
echo **** Node.js package install complete. ****

echo **** Running the default grunt task. ****
call grunt --verbose