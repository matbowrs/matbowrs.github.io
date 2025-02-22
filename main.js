document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons first
    lucide.createIcons();

    // Terminal functionality
    const terminalBtn = document.getElementById('terminal-btn');
    const terminalContainer = document.getElementById('terminal-container');
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.querySelector('.terminal-output');
    const terminalClose = document.querySelector('.control.close');
    const terminalContent = document.getElementById('terminal-content');

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const sunIcon = document.querySelector('[data-lucide="sun"]');
    const moonIcon = document.querySelector('[data-lucide="moon"]');

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });

    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabGroup = document.getElementById('tabGroup');
    const breadcrumb = document.getElementById('breadcrumb');

    function switchToContent(targetTab) {
        const tabId = targetTab.getAttribute('data-tab');
        
        // Update content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        
        // Hide tabs, show breadcrumb
        tabGroup.classList.add('hidden');
        breadcrumb.classList.remove('hidden');
        
        // Update current page in breadcrumb
        breadcrumb.querySelector('.current-page').textContent = targetTab.textContent;
    }

    function goHome() {
        // Show tabs, hide breadcrumb
        tabGroup.classList.remove('hidden');
        breadcrumb.classList.add('hidden');
        
        // Go to first tab content
        const firstTabId = tabs[0].getAttribute('data-tab');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(firstTabId).classList.add('active');
    }

    // Add click handlers to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (!tab.classList.contains('terminal-btn')) {
                switchToContent(tab);
            }
        });
    });

    // Add home navigation handlers
    document.querySelector('.back-button').addEventListener('click', goHome);
    document.querySelector('.home-link').addEventListener('click', goHome);

    // Add an array of jokes
    const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why do Java developers wear glasses? Because they don't see sharp!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
        "Why was the developer unhappy at their job? They wanted arrays!",
    ];

    // Function to handle terminal commands
    function handleCommand(command) {
        const terminalOutput = document.querySelector('.terminal-output');
        switch (command) {
            case 'ls':
                terminalOutput.innerHTML += '<div style="color: #27c93f">You found the easter egg! 🎉</div>';
                break;
            case 'help':
                terminalOutput.innerHTML += '<div>Available commands: ls, help, echo [message], joke</div>';
                break;
            case 'joke':
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                terminalOutput.innerHTML += `<div>${randomJoke}</div>`;
                break;
            default:
                if (command.startsWith('echo ')) {
                    const message = command.slice(5);
                    terminalOutput.innerHTML += `<div>${message}</div>`;
                } else {
                    terminalOutput.innerHTML += `<div style="color: #ff5f56">Command not found. Not surprising, right? It's not a full terminal!\nType "help" for a list of commands.</div>`;
                }
        }
    }

    // Terminal Event Listeners
    if (terminalBtn && terminalContainer) {
        // Function to handle terminal closing
        function closeTerminal() {
            terminalContainer.classList.remove('active');
            terminalContainer.classList.add('closing');
            
            // Remove closing class after animation completes
            setTimeout(() => {
                terminalContainer.classList.remove('closing');
            }, 400);
        }

        terminalBtn.addEventListener('click', () => {
            console.log('Terminal button clicked!');
            terminalContainer.classList.remove('closing');
            terminalContainer.classList.add('active');
            terminalInput.focus();
        });

        terminalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeTerminal();
        });

        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                
                // Add command to output
                terminalOutput.innerHTML += `<div>$ ${command}</div>`;
                
                // Process command using the new function
                handleCommand(command);
                
                // Clear input
                terminalInput.value = '';
                
                // Scroll to bottom
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        });

        // Close terminal when clicking outside
        document.addEventListener('click', (e) => {
            if (terminalContainer.classList.contains('active') && 
                !terminalContainer.contains(e.target) && 
                !terminalBtn.contains(e.target)) {
                closeTerminal();
            }
        });
    }

    // Show first tab content initially
    const firstTabId = tabs[0].getAttribute('data-tab');
    document.getElementById(firstTabId).classList.add('active');
});