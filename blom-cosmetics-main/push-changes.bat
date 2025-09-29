@echo off
echo Pushing changes to GitHub...
echo.

echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Update product pages with professional styling and improved UX"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo Done! Your changes have been pushed to GitHub.
echo You can view them at: https://github.com/streamline-autmations/blom-cosmetics
pause
