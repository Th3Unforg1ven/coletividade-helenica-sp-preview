@echo off
setlocal
cd /d "%~dp0"
title Gerar pacote de publicacao CHSP

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Nao foi possivel encontrar o Node.js e o npm neste computador.
  pause
  exit /b 1
)

call npm.cmd run build
if errorlevel 1 (
  echo A compilacao apresentou um erro.
  pause
  exit /b 1
)

powershell.exe -NoProfile -Command "$package = Join-Path (Get-Location) 'CHSP-site-pronto-para-publicar.zip'; if (Test-Path -LiteralPath $package) { Remove-Item -LiteralPath $package -Force }; Compress-Archive -Path (Join-Path (Get-Location) 'dist\*') -DestinationPath $package -CompressionLevel Optimal"
if errorlevel 1 (
  echo Nao foi possivel gerar o arquivo ZIP.
  pause
  exit /b 1
)

echo.
echo Pacote criado com sucesso:
echo CHSP-site-pronto-para-publicar.zip
echo.
echo Para publicar, arraste a pasta dist em https://app.netlify.com/drop
pause
endlocal
