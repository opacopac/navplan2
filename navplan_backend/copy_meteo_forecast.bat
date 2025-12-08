@echo off

set SOURCE_PATH=./meteo_forecast
set CONTAINER_NAME=navplan_backend
set CONTAINER_DEST=/var/www/html/meteo_forecast/

echo Copying meteo_forecast data to docker volume.
echo Source: %SOURCE_PATH%
echo Destination: %CONTAINER_NAME%:%CONTAINER_DEST%
echo This may take several minutes...
echo.

docker cp "%SOURCE_PATH%\." %CONTAINER_NAME%:%CONTAINER_DEST%

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Successfully copied meteo_forecast data to volume!
) else (
    echo.
    echo Error: Failed to copy files. Make sure:
    echo 1. The %CONTAINER_NAME% container is running
    echo 2. The source folder %SOURCE_PATH% exists
    echo.
    echo You can start the containers with: docker-compose up -d
    exit /b 1
)

echo.
