
# Complete Installation Guide for Beginners

This guide will walk you through setting up this project from scratch, starting with installing the necessary tools.

## 1. Installing Visual Studio Code (VS Code)

VS Code is a lightweight but powerful source code editor.

### For Windows:
1. Go to [VS Code download page](https://code.visualstudio.com/download)
2. Click on the Windows download button
3. Once downloaded, run the installer (VSCodeUserSetup-{version}.exe)
4. Follow the installation wizard:
   - Accept the agreement
   - Choose the destination location (or keep default)
   - Select Start Menu Folder (or keep default)
   - Select additional tasks (recommended: Add "Open with Code" action)
   - Click Install

### For macOS:
1. Go to [VS Code download page](https://code.visualstudio.com/download)
2. Click on the Mac download button
3. Once downloaded, open the browser's download list and locate the zip file
4. Extract the zip file
5. Drag Visual Studio Code.app to the Applications folder
6. Double-click on the app to launch it

### For Linux:
1. Go to [VS Code download page](https://code.visualstudio.com/download)
2. Download the .deb (Debian, Ubuntu) or .rpm (Red Hat, Fedora) package
3. Install it using your package manager:
   - For Debian/Ubuntu: `sudo apt install ./downloaded-file.deb`
   - For Red Hat/Fedora: `sudo rpm -i ./downloaded-file.rpm`

## 2. Installing Node.js and npm

Node.js is a JavaScript runtime, and npm is a package manager for JavaScript.

### Using NVM (Node Version Manager) - Recommended:

#### For Windows:
1. Install [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)
2. Download the nvm-setup.zip file
3. Extract and run the installer
4. Open a new command prompt and run:
   ```
   nvm install 18.16.0
   nvm use 18.16.0
   ```

#### For macOS and Linux:
1. Open Terminal
2. Run this command to install NVM:
   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```
3. Close and reopen Terminal, or run:
   ```
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```
4. Install and use Node.js:
   ```
   nvm install 18.16.0
   nvm use 18.16.0
   ```

### Direct Installation:

If you prefer not to use NVM, you can install Node.js directly:

1. Go to [Node.js download page](https://nodejs.org/en/download/)
2. Download the installer for your operating system
3. Run the installer and follow the installation wizard
4. Verify the installation by opening a terminal/command prompt and typing:
   ```
   node --version
   npm --version
   ```

## 3. Setting Up Git (Version Control)

### For Windows:
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer
3. Accept the license and follow the installation wizard with default options
4. Select your preferred editor (VS Code recommended)
5. Choose "Git from the command line and also from 3rd-party software"
6. Choose "Use the OpenSSL library"
7. Configure line ending conversions (recommended: Checkout as-is, commit Unix-style)
8. Configure terminal emulator (recommended: Use Windows' default console)
9. Complete the installation

### For macOS:
1. Open Terminal
2. If you have Homebrew installed, run:
   ```
   brew install git
   ```
3. If not, you'll be prompted to install developer tools when you first run `git` in Terminal

### For Linux (Ubuntu/Debian):
1. Open Terminal
2. Run:
   ```
   sudo apt update
   sudo apt install git
   ```

## 4. Cloning and Running This Project

1. Open Terminal/Command Prompt
2. Clone the repository:
   ```
   git clone <YOUR_GIT_URL>
   ```
3. Navigate to the project directory:
   ```
   cd <YOUR_PROJECT_NAME>
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:8080`

## 5. VS Code Extensions (Recommended)

Open VS Code and install these extensions to improve your development experience:

1. **ESLint**: For JavaScript/TypeScript linting
2. **Prettier**: For code formatting
3. **Tailwind CSS IntelliSense**: For Tailwind CSS class suggestions
4. **React Developer Tools**: For React component inspection
5. **GitHub Copilot**: For AI-assisted coding (optional, requires subscription)

To install an extension:
1. Click on the Extensions icon in the left sidebar (or press Ctrl+Shift+X)
2. Search for the extension name
3. Click "Install"

## 6. Project Structure Overview

- `/src`: Contains the source code
  - `/components`: Reusable UI components
  - `/pages`: Different pages of the application
  - `/services`: API services and utilities
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions

## 7. Troubleshooting Common Issues

### "npm install" fails:
- Try clearing npm cache: `npm cache clean --force`
- Make sure you're using the correct Node.js version
- Check your internet connection

### "npm run dev" fails:
- Make sure all dependencies are installed: `npm install`
- Check if the port is already in use (try a different port)
- Check console for specific error messages

### Git issues:
- Configure your Git username and email:
  ```
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

## 8. Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## 9. Getting Help

If you encounter any issues or have questions:
- Check the project's README.md file
- Create an issue on the project's Git repository
- Search for similar issues online
