document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons first
    lucide.createIcons();

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
        tab.addEventListener('click', () => switchToContent(tab));
    });

    // Add home navigation handlers
    document.querySelector('.back-button').addEventListener('click', goHome);
    document.querySelector('.home-link').addEventListener('click', goHome);

    // Show first tab content initially
    const firstTabId = tabs[0].getAttribute('data-tab');
    document.getElementById(firstTabId).classList.add('active');
});