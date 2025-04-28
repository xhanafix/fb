# Facebook Post Generator

A simple, single-page web application that generates Facebook posts based on copywriting frameworks using the OpenRouter AI API. The app allows users to select a framework (AIDA, PASTOR, QUEST, or 4U's) and language (English or Bahasa Malaysia) to create compelling Facebook posts for their products or topics.

## Features

- Generate Facebook posts using four popular copywriting frameworks
- Support for English and Bahasa Malaysia
- Choice between two Google AI models (Gemini 2.0 Flash and LearnLM 1.5 Pro)
- Secure OpenRouter API integration with localStorage for API key storage
- Clean, responsive UI with loading indicators
- Copy to clipboard functionality
- No external dependencies - built with vanilla HTML, CSS, and JavaScript

## Setup Instructions

1. Clone this repository to your local machine or download it as a ZIP file.
2. Open the folder in your preferred code editor.
3. No build steps required - simply open `index.html` in your web browser to run the application locally.

## Usage

1. When you first load the application, you'll be prompted to enter your OpenRouter API key.
   - Get your API key from [OpenRouter](https://openrouter.ai/) if you don't already have one.
   - The key will be stored securely in your browser's localStorage.

2. Select a copywriting framework from the dropdown:
   - AIDA (Attention, Interest, Desire, Action)
   - PASTOR (Problem, Amplify, Story/Solution, Transformation, Offer, Response)
   - QUEST (Qualify, Understand, Educate, Stimulate, Transition)
   - 4U's (Urgent, Unique, Useful, Ultra-specific)

3. Choose your preferred language (English or Bahasa Malaysia).

4. Select an AI model:
   - Google Gemini 2.0 Flash - Fast and efficient
   - Google LearnLM 1.5 Pro - More specialized for learning content

5. Enter your topic or product name and key benefit or pain point.

6. Click "Generate Post" to create your Facebook post.

7. Use the "Copy to Clipboard" button to copy the generated post for use elsewhere.

## Deployment to GitHub Pages

Follow these steps to deploy the application to GitHub Pages:

1. **Create a GitHub repository**:
   - Sign in to your GitHub account or create one if needed.
   - Click the "+" icon in the top right corner and select "New repository".
   - Name your repository (e.g., "facebook-post-generator").
   - Set it to Public.
   - Click "Create repository".

2. **Initialize Git and push your code**:
   ```bash
   # Navigate to your project folder
   cd path/to/facebook-post-generator
   
   # Initialize Git repository
   git init
   
   # Add all files to staging
   git add .
   
   # Commit the files
   git commit -m "Initial commit"
   
   # Add remote repository URL (replace with your actual repository URL)
   git remote add origin https://github.com/yourusername/facebook-post-generator.git
   
   # Push to GitHub
   git push -u origin master
   ```

3. **Set up GitHub Pages**:
   - Go to your repository on GitHub.
   - Click "Settings" tab.
   - Scroll down to "GitHub Pages" section.
   - Under "Source", select "master branch" (or "main" branch if that's what you're using).
   - Click "Save".
   - Wait a few minutes for GitHub Pages to build your site.
   - You'll see a message with the URL where your site is published (usually https://yourusername.github.io/facebook-post-generator/).

4. **Share your application**:
   - Your Facebook Post Generator is now live and can be shared with anyone via the GitHub Pages URL.

## Security Note

Your OpenRouter API key is stored in your browser's localStorage. This means:
- The key is only stored on your device
- It persists between browser sessions
- It's not sent to any servers other than OpenRouter's API endpoint
- Other websites cannot access this key

## License

This project is open source and available under the MIT License. 