@echo off
setlocal
cd /d "%~dp0"
title Coletividade Helenica de Sao Paulo

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Nao foi possivel encontrar o Node.js e o npm neste computador.
  echo Instale o Node.js e execute este arquivo novamente.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Preparando o projeto pela primeira vez...
  call npm.cmd install
  if errorlevel 1 (
    echo Nao foi possivel instalar as dependencias do projeto.
    pause
    exit /b 1
  )
)

echo Iniciando o site em http://localhost:5173/
echo Mantenha esta janela aberta enquanto estiver usando o site.
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:5173/'"
call npm.cmd run dev -- --host 127.0.0.1

endlocal
