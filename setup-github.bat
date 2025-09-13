@echo off
echo ========================================
echo    Sunrise School Website Setup
echo ========================================
echo.

echo Step 1: Creating .gitignore file...
echo node_modules/ > .gitignore
echo .next/ >> .gitignore
echo out/ >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo .env.production.local >> .gitignore
echo .env.development.local >> .gitignore
echo npm-debug.log* >> .gitignore
echo yarn-debug.log* >> .gitignore
echo yarn-error.log* >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore
echo.

echo Step 2: Creating deployment instructions...
echo # Deployment Instructions > DEPLOYMENT.md
echo. >> DEPLOYMENT.md
echo ## Quick Setup: >> DEPLOYMENT.md
echo 1. Open VSCode in this folder >> DEPLOYMENT.md
echo 2. Press Ctrl+Shift+P >> DEPLOYMENT.md
echo 3. Type "Git: Initialize Repository" >> DEPLOYMENT.md
echo 4. Type "Git: Publish to GitHub" >> DEPLOYMENT.md
echo 5. Name repository: SRSproject >> DEPLOYMENT.md
echo 6. Make it Public >> DEPLOYMENT.md
echo 7. Go to GitHub Settings ^> Pages ^> Source: GitHub Actions >> DEPLOYMENT.md
echo. >> DEPLOYMENT.md
echo ## Your website will be live at: >> DEPLOYMENT.md
echo https://yourusername.github.io/SRSproject >> DEPLOYMENT.md
echo. >> DEPLOYMENT.md
echo ## Admin Access: >> DEPLOYMENT.md
echo URL: /admin/login >> DEPLOYMENT.md
echo Email: admin@sunriseschool.com >> DEPLOYMENT.md
echo Password: admin123 >> DEPLOYMENT.md
echo. >> DEPLOYMENT.md

echo Step 3: Creating project summary...
echo # Project Summary > PROJECT-INFO.md
echo. >> PROJECT-INFO.md
echo ## What's Included: >> PROJECT-INFO.md
echo ✅ Complete Next.js website >> PROJECT-INFO.md
echo ✅ Beautiful responsive design >> PROJECT-INFO.md
echo ✅ Admin portal with demo data >> PROJECT-INFO.md
echo ✅ All pages working perfectly >> PROJECT-INFO.md
echo ✅ GitHub Pages ready >> PROJECT-INFO.md
echo ✅ No backend required >> PROJECT-INFO.md
echo. >> PROJECT-INFO.md
echo ## Pages: >> PROJECT-INFO.md
echo - Homepage with animations >> PROJECT-INFO.md
echo - About page >> PROJECT-INFO.md
echo - Academics (Primary, Middle, High School) >> PROJECT-INFO.md
echo - Admissions form >> PROJECT-INFO.md
echo - News & Events >> PROJECT-INFO.md
echo - Gallery >> PROJECT-INFO.md
echo - Contact >> PROJECT-INFO.md
echo - Admin Portal >> PROJECT-INFO.md
echo. >> PROJECT-INFO.md

echo Step 4: Creating VSCode settings...
if not exist .vscode mkdir .vscode
echo { > .vscode\settings.json
echo   "git.enabled": true, >> .vscode\settings.json
echo   "git.autofetch": true, >> .vscode\settings.json
echo   "files.exclude": { >> .vscode\settings.json
echo     "**/node_modules": true, >> .vscode\settings.json
echo     "**/.next": true, >> .vscode\settings.json
echo     "**/out": true >> .vscode\settings.json
echo   } >> .vscode\settings.json
echo } >> .vscode\settings.json
echo.

echo ========================================
echo           SETUP COMPLETE!
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Open VSCode in this folder
echo 2. Press Ctrl+Shift+P
echo 3. Type "Git: Initialize Repository"
echo 4. Type "Git: Publish to GitHub"
echo 5. Name it: SRSproject
echo 6. Make it Public
echo 7. Enable GitHub Pages in repository settings
echo.
echo Your website will be live at:
echo https://yourusername.github.io/SRSproject
echo.
echo Admin login: admin@sunriseschool.com / admin123
echo.
pause
