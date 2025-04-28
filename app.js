document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const apiKeyModal = document.getElementById('api-key-modal');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    const postForm = document.getElementById('post-form');
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const resultDiv = document.getElementById('result');
    const copyBtn = document.getElementById('copy-btn');
    const newPostBtn = document.getElementById('new-post-btn');
    const spinner = document.getElementById('spinner');

    // Check if API key exists in localStorage
    const checkApiKey = () => {
        // Check if OpenRouter API key exists in localStorage
        const apiKey = localStorage.getItem('openRouterApiKey');
        if (!apiKey) {
            // Show the API key modal if no key is found
            apiKeyModal.classList.remove('hidden');
        } else {
            apiKeyModal.classList.add('hidden');
        }
        return apiKey;
    };

    // Initialize app by checking for API key
    let apiKey = checkApiKey();

    // Save API key to localStorage
    saveApiKeyBtn.addEventListener('click', () => {
        const newApiKey = apiKeyInput.value.trim();
        if (newApiKey) {
            // Store API key in localStorage
            localStorage.setItem('openRouterApiKey', newApiKey);
            apiKey = newApiKey;
            apiKeyModal.classList.add('hidden');
        } else {
            alert('Please enter a valid API key');
        }
    });

    // Generate Facebook post when form is submitted
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check if API key exists
        if (!apiKey) {
            apiKeyModal.classList.remove('hidden');
            return;
        }
        
        // Get form data
        const framework = document.getElementById('framework').value;
        const language = document.getElementById('language').value;
        const aiModel = document.getElementById('ai-model').value;
        const topic = document.getElementById('topic').value.trim();
        const painPoint = document.getElementById('pain-point').value.trim();
        
        // Validate form data
        if (!topic || !painPoint) {
            alert('Please fill out all fields');
            return;
        }
        
        // Show loading spinner
        postForm.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        spinner.classList.remove('hidden');
        resultDiv.textContent = '';
        
        try {
            // Build prompt for OpenRouter API
            const prompt = buildPrompt(framework, language, topic, painPoint);
            
            // Make API request to OpenRouter with selected model
            const response = await callOpenRouterAPI(prompt, aiModel);
            
            // Display the generated post
            resultDiv.textContent = response;
            spinner.classList.add('hidden');
        } catch (error) {
            console.error('Error generating post:', error);
            resultDiv.textContent = 'Error generating post. Please try again.';
            spinner.classList.add('hidden');
        }
    });
    
    // Build prompt for OpenRouter API
    const buildPrompt = (framework, language, topic, painPoint) => {
        return `Generate a Facebook post using the ${framework} copywriting framework in ${language}.

User inputs:
• Framework: ${framework}
• Language: ${language}
• Topic/Product: "${topic}"
• Key Benefit or Pain Point: "${painPoint}"

Instructions:
1. Hook – Start with a bold opening line that grabs attention.
2. Body – Follow the ${framework} structure:
   - AIDA: Attention, Interest, Desire, Action.
   - PASTOR: Problem, Amplify, Story/Solution, Transformation, Offer, Response.
   - QUEST: Qualify, Understand, Educate, Stimulate, Transition.
   - 4U's: Urgent, Unique, Useful, Ultra-specific.
3. Tone – Friendly and conversational. If Bahasa Malaysia, include local slang.
4. Length – 80–120 words.
5. Engagement – End with a question or CTA ("Comment 'YES' if…" or "Tag a friend who…").

Output only the final post text in ${language}, with no extra markup or explanation.`;
    };
    
    // Call OpenRouter API
    const callOpenRouterAPI = async (prompt, model) => {
        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        
        const payload = {
            model: model, // Use the selected model
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        };
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'Facebook Post Generator'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    };
    
    // Copy generated post to clipboard
    copyBtn.addEventListener('click', () => {
        const text = resultDiv.textContent;
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    // Temporarily change button text to indicate success
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy text to clipboard');
                });
        }
    });
    
    // Reset form to create a new post
    newPostBtn.addEventListener('click', () => {
        postForm.reset();
        postForm.classList.remove('hidden');
        resultContainer.classList.add('hidden');
    });
}); 