# Development Environment Setup Guide

## Prerequisites

### Required Software
1. **Node.js (v16+)**
   ```bash
   # Windows
   Download and install from https://nodejs.org/

   # macOS (using Homebrew)
   brew install node

   # Linux
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Git**
   ```bash
   # Windows
   Download and install from https://git-scm.com/

   # macOS
   brew install git

   # Linux
   sudo apt-get install git
   ```

3. **Visual Studio Code**
   - Download from: https://code.visualstudio.com/
   - Install recommended extensions:
     - ESLint
     - Prettier
     - TypeScript and JavaScript Language Features
     - Material Icon Theme

## Project Setup

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd layday
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy example environment file
   cp .env.example .env

   # Edit .env file with your local settings
   # Required variables:
   # - API_URL
   # - AUTH_SECRET
   # - DATABASE_URL
   ```

4. **VSCode Configuration**
   - Open project in VSCode
   - Install recommended extensions
   - Configure settings:
     ```json
     {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "typescript.tsdk": "node_modules/typescript/lib"
     }
     ```

## Running the Application

1. **Development Server**
   ```bash
   # Start frontend development server
   cd frontend
   npm run dev

   # Server will start at http://localhost:3000
   ```

2. **Type Checking**
   ```bash
   # Run TypeScript type checking
   npm run type-check
   ```

3. **Linting**
   ```bash
   # Run ESLint
   npm run lint

   # Fix auto-fixable issues
   npm run lint:fix
   ```

4. **Formatting**
   ```bash
   # Format code with Prettier
   npm run format
   ```

## Common Issues & Solutions

### Node Version Mismatch
**Issue:** Incompatible Node.js version
**Solution:**
1. Install nvm (Node Version Manager)
2. Run `nvm install 16`
3. Run `nvm use 16`

### Package Installation Errors
**Issue:** Dependencies fail to install
**Solution:**
1. Delete node_modules directory
2. Delete package-lock.json
3. Clear npm cache: `npm cache clean --force`
4. Reinstall: `npm install`

### Port Already in Use
**Issue:** Port 3000 already in use
**Solution:**
1. Find process: `netstat -ano | findstr :3000`
2. Kill process: `taskkill /PID [process-id] /F`

## Development Workflow

1. **Creating New Features**
   ```bash
   # Create feature branch
   git checkout -b feature/feature-name

   # Make changes and commit
   git add .
   git commit -m "feat: description"

   # Push changes
   git push origin feature/feature-name
   ```

2. **Code Quality Checks**
   - Run before committing:
     ```bash
     npm run lint
     npm run type-check
     npm run test
     ```

3. **Updating Dependencies**
   ```bash
   # Check for updates
   npm outdated

   # Update dependencies
   npm update

   # Update specific package
   npm install package@latest
   ```

## Troubleshooting

### Build Errors
1. Clear build cache:
   ```bash
   npm run clean
   ```
2. Rebuild:
   ```bash
   npm run build
   ```

### TypeScript Errors
1. Clear TypeScript cache:
   ```bash
   rm -rf node_modules/.cache/typescript
   ```
2. Restart TypeScript server in VSCode:
   - Press Cmd/Ctrl + Shift + P
   - Type "TypeScript: Restart TS Server"
   - Press Enter

### Git Issues
1. Reset local changes:
   ```bash
   git reset --hard HEAD
   ```
2. Update from remote:
   ```bash
   git fetch origin
   git reset --hard origin/main
   ```

## Support

For additional support:
1. Check project documentation in `/project_docs`
2. Review error logs in `/project_docs/errorsBugs.md`
3. Contact development team
4. Create issue in project repository
