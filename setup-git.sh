#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Portfolio Website GitHub Pages Setup${NC}"
echo "This script will help you initialize your Git repository for GitHub Pages deployment."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Check if already a git repository
if [ -d ".git" ]; then
    echo -e "${YELLOW}This directory is already a Git repository.${NC}"
    
    # Check if remote exists
    if git remote -v | grep -q origin; then
        echo "Remote 'origin' already exists:"
        git remote -v
    else
        echo ""
        echo -e "${YELLOW}No remote repository set. Let's add one.${NC}"
        read -p "Enter your GitHub username: " username
        read -p "Enter your repository name: " repo
        
        git remote add origin "https://github.com/$username/$repo.git"
        echo -e "${GREEN}Remote added successfully!${NC}"
    fi
else
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    
    echo ""
    echo -e "${YELLOW}Setting up remote repository...${NC}"
    read -p "Enter your GitHub username: " username
    read -p "Enter your repository name: " repo
    
    git remote add origin "https://github.com/$username/$repo.git"
    echo -e "${GREEN}Remote added successfully!${NC}"
fi

echo ""
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

echo ""
echo -e "${YELLOW}Committing changes...${NC}"
read -p "Enter commit message [Initial commit]: " commit_msg
commit_msg=${commit_msg:-"Initial commit"}

git commit -m "$commit_msg"

echo ""
echo -e "${YELLOW}Pushing to GitHub...${NC}"
echo "This will push your code to the 'main' branch on GitHub."
read -p "Continue? (y/n): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    git push -u origin main
    echo -e "${GREEN}Push completed!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Go to https://github.com/$username/$repo/settings"
    echo "2. Scroll down to the 'GitHub Pages' section"
    echo "3. Select 'main' branch as the source"
    echo "4. Click 'Save'"
    echo ""
    echo -e "${GREEN}Your website will be available at: https://$username.github.io/$repo/${NC}"
else
    echo "Push cancelled. You can push manually with: git push -u origin main"
fi 