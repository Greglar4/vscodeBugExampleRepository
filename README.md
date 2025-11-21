# Instruction to Reproduce

1. Open this project in VS Code
2. Run npm install
3. Run npm run build
4. Run the extension in the development host (e.g. by using F5)
5. Create a file with .fnf extension
6. Open the file with the File Not Found Example Editor
7. Ensure the vs code setting Workbench > Editor: Close On File Delete is off.
8. Press the button that says "Click Me". This will delete the file via vs code fs api.
9. Without closing the File Not Found Example Editor, close the vs code window which is running the extension in the development host.
10. Run the extension in the development host (e.g. by using F5)
11. Close the editor of the file that was deleted in step 8.
12. Create a .fnf file with the same name as the file created in step 5.
13. Try to open the file created in step 12 with the File Not Found Example Editor, it will give a file not found error, even though this file now exists, and that the text editor can open the file fine.