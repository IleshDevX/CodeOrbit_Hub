document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    // !!! IMPORTANT: REPLACE 'YOUR_API_KEY' WITH YOUR ACTUAL FRED API KEY !!!
    const API_KEY = 'd33f97bcd9ecfa65b2bf2ce70080898d';
    const API_BASE_URL = 'https://api.stlouisfed.org/fred';
    
    // Use a working CORS proxy
    const CORS_PROXIES = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest='
    ];
    
    let currentProxyIndex = 0;

    // --- DOM ELEMENT SELECTION ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const dashboardSection = document.getElementById('dashboard-section');
    const chartTitle = document.getElementById('chart-title');
    const chartCanvas = document.getElementById('data-chart') ? document.getElementById('data-chart').getContext('2d') : null;
    
    // Info Panel Elements
    const infoId = document.getElementById('info-id');
    const infoUnits = document.getElementById('info-units');
    const infoFrequency = document.getElementById('info-frequency');
    const infoUpdated = document.getElementById('info-updated');
    const infoNotes = document.getElementById('info-notes');
    
    let dataChart; // Variable to hold the chart instance

    // --- API FETCH FUNCTIONS ---

    /**
     * Fetches data using JSONP to bypass CORS
     */
    const fetchWithJSONP = (apiUrl) => {
        return new Promise((resolve, reject) => {
            // Create a unique callback name
            const callbackName = 'fredCallback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            // Add JSONP callback parameter to the URL
            const jsonpUrl = apiUrl + '&callback=' + callbackName;
            
            // Create script element
            const script = document.createElement('script');
            script.src = jsonpUrl;
            
            // Set up the callback function
            window[callbackName] = function(data) {
                console.log('JSONP Success:', data);
                // Clean up
                document.head.removeChild(script);
                delete window[callbackName];
                resolve(data);
            };
            
            // Handle errors
            script.onerror = function() {
                console.log('JSONP Error for URL:', jsonpUrl);
                // Clean up
                document.head.removeChild(script);
                delete window[callbackName];
                reject(new Error('JSONP request failed'));
            };
            
            // Add script to head to execute
            document.head.appendChild(script);
            
            // Set timeout
            setTimeout(() => {
                if (window[callbackName]) {
                    document.head.removeChild(script);
                    delete window[callbackName];
                    reject(new Error('JSONP request timeout'));
                }
            }, 10000); // 10 second timeout
        });
    };

    /**
     * Fetches data with multiple fallback methods
     */
    const fetchWithFallback = async (apiUrl) => {
        console.log('Starting fetch with fallback for:', apiUrl);
        
        // Method 1: Try JSONP first (most reliable for FRED API)
        try {
            console.log('Trying JSONP method...');
            const data = await fetchWithJSONP(apiUrl);
            return data;
        } catch (error) {
            console.log('JSONP failed:', error.message);
        }
        
        // Method 2: Try CORS proxies
        for (let i = 0; i < CORS_PROXIES.length; i++) {
            try {
                const proxyUrl = CORS_PROXIES[i] + encodeURIComponent(apiUrl);
                console.log(`Trying proxy ${i + 1}: ${proxyUrl}`);
                
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Successfully fetched data via proxy:', data);
                return data;
            } catch (error) {
                console.log(`Proxy ${i + 1} failed:`, error.message);
            }
        }
        
        // Method 3: Direct fetch (will likely fail due to CORS but worth trying)
        try {
            console.log('Trying direct fetch...');
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Direct fetch succeeded:', data);
            return data;
        } catch (error) {
            console.log('Direct fetch failed:', error.message);
        }
        
        throw new Error('All fetch methods failed');
    };

    /**
     * Searches for economic data series.
     * @param {string} searchTerm - The term to search for.
     */
    const searchSeries = async (searchTerm) => {
        showLoader();
        hideError();
        searchResultsContainer.innerHTML = ''; // Clear previous results

        const apiUrl = `${API_BASE_URL}/series/search?search_text=${encodeURIComponent(searchTerm)}&api_key=${API_KEY}&file_type=json`;

        try {
            const data = await fetchWithFallback(apiUrl);
            
            if (data.seriess && data.seriess.length > 0) {
                displaySearchResults(data.seriess);
            } else {
                showError('No results found. Try a different search term.');
            }
        } catch (error) {
            console.error('Error searching for series:', error);
            
            // Fallback to sample data if API fails
            if (searchTerm.toLowerCase().includes('gdp') || searchTerm.toLowerCase().includes('unemployment') || searchTerm.toLowerCase().includes('inflation')) {
                console.log('Using sample data as fallback');
                displaySampleData(searchTerm);
            } else {
                showError('Failed to fetch data. Try searching for "GDP", "Unemployment", or "Inflation" to see sample data, or check your network connection.');
            }
        } finally {
            hideLoader();
        }
    };

    /**
     * Fetches the observations (data points) for a specific series.
     * @param {string} seriesId - The ID of the series to fetch.
     */
    const getSeriesObservations = async (seriesId) => {
        showLoader();
        hideError();
        
        const apiUrl = `${API_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json`;

        try {
            const data = await fetchWithFallback(apiUrl);
            return data.observations;
        } catch (error) {
            console.error('Error fetching series observations:', error);
            showError('Failed to fetch chart data.');
            return null;
        } finally {
            hideLoader();
        }
    };

    /**
     * Display sample data when API fails
     */
    const displaySampleData = (searchTerm) => {
        const sampleSeries = getSampleSeriesData(searchTerm);
        displaySearchResults(sampleSeries);
    };

    /**
     * Get sample series data based on search term
     */
    const getSampleSeriesData = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        
        if (term.includes('gdp')) {
            return [{
                id: 'GDP_SAMPLE',
                title: 'Gross Domestic Product (Sample Data)',
                frequency: 'Quarterly',
                observation_end: '2024-Q2',
                units: 'Billions of Dollars',
                notes: 'Sample GDP data for demonstration purposes'
            }];
        } else if (term.includes('unemployment')) {
            return [{
                id: 'UNRATE_SAMPLE',
                title: 'Unemployment Rate (Sample Data)',
                frequency: 'Monthly',
                observation_end: '2024-09',
                units: 'Percent',
                notes: 'Sample unemployment rate data for demonstration purposes'
            }];
        } else if (term.includes('inflation')) {
            return [{
                id: 'CPIAUCSL_SAMPLE',
                title: 'Consumer Price Index (Sample Data)',
                frequency: 'Monthly',
                observation_end: '2024-09',
                units: 'Index 1982-1984=100',
                notes: 'Sample inflation data for demonstration purposes'
            }];
        }
        
        return [];
    };

    /**
     * Get sample observations for demo data
     */
    const getSampleObservations = (seriesId) => {
        const currentYear = new Date().getFullYear();
        const observations = [];
        
        if (seriesId === 'GDP_SAMPLE') {
            // Generate sample GDP data (growing trend)
            for (let i = 0; i < 20; i++) {
                const year = currentYear - 5 + Math.floor(i / 4);
                const quarter = (i % 4) + 1;
                const value = 20000 + (i * 500) + (Math.random() * 1000 - 500);
                observations.push({
                    date: `${year}-Q${quarter}`,
                    value: value.toFixed(1)
                });
            }
        } else if (seriesId === 'UNRATE_SAMPLE') {
            // Generate sample unemployment data (fluctuating)
            for (let i = 0; i < 24; i++) {
                const date = new Date(currentYear - 2, i, 1);
                const value = 4 + Math.sin(i * 0.5) * 2 + (Math.random() * 1 - 0.5);
                observations.push({
                    date: date.toISOString().slice(0, 7),
                    value: Math.max(0, value).toFixed(1)
                });
            }
        } else if (seriesId === 'CPIAUCSL_SAMPLE') {
            // Generate sample CPI data (steady growth)
            for (let i = 0; i < 24; i++) {
                const date = new Date(currentYear - 2, i, 1);
                const value = 280 + (i * 2) + (Math.random() * 5 - 2.5);
                observations.push({
                    date: date.toISOString().slice(0, 7),
                    value: value.toFixed(1)
                });
            }
        }
        
        return observations;
    };
    
    // --- DISPLAY & RENDER FUNCTIONS ---
    
    /**
     * Displays the search results as cards in the UI.
     * @param {Array} seriesList - An array of series objects from the API.
     */
    const displaySearchResults = (seriesList) => {
        // Reset container and pagination state
        searchResultsContainer.innerHTML = '';
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return; // safety
        loadMoreBtn.style.display = 'none';

        let currentIndex = 0;
        const pageSize = 12; // 3 x 4 grid

        const renderPage = () => {
            const fragment = document.createDocumentFragment();
            const end = Math.min(currentIndex + pageSize, seriesList.length);
            for (let i = currentIndex; i < end; i++) {
                const series = seriesList[i];
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <h3>${series.title}</h3>
                    <p><strong>ID:</strong> ${series.id}</p>
                    <p><strong>Frequency:</strong> ${series.frequency}</p>
                    <p><strong>Last Updated:</strong> ${series.observation_end}</p>
                `;
                // subtle staggered animation
                card.style.animationDelay = `${(i - currentIndex) * 0.05}s`;
                card.addEventListener('click', () => handleSeriesSelection(series));
                fragment.appendChild(card);
            }

            searchResultsContainer.appendChild(fragment);
            currentIndex = end;

            // Show or hide the Load More button depending on remaining items
            if (currentIndex < seriesList.length) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        };

        // Reset click handler to avoid stacking listeners
        loadMoreBtn.onclick = () => {
            renderPage();
        };

        // Render first page
        renderPage();
    };
    
    /**
     * Handles the selection of a series, fetches its data, and displays it.
     * @param {object} series - The selected series object.
     */
    const handleSeriesSelection = async (series) => {
        let observations;
        
        // Check if this is sample data
        if (series.id.includes('_SAMPLE')) {
            observations = getSampleObservations(series.id);
        } else {
            observations = await getSeriesObservations(series.id);
        }
        
        if (observations && observations.length > 0) {
            updateDashboard(series, observations);
            dashboardSection.style.display = 'block';
            dashboardSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            showError('No data available for this series.');
        }
    };
    
    /**
     * Updates the dashboard with the chart and series information.
     * @param {object} series - The series metadata.
     * @param {Array} observations - The data points for the chart.
     */
    const updateDashboard = (series, observations) => {
        // Update Info Panel
        chartTitle.textContent = series.title;
        infoId.textContent = series.id;
        infoUnits.textContent = series.units;
        infoFrequency.textContent = series.frequency;
        infoUpdated.textContent = series.last_updated;
        infoNotes.textContent = series.notes || 'No description available.';

        // Prepare data for Chart.js
        const labels = observations.map(obs => obs.date);
        const dataPoints = observations.map(obs => parseFloat(obs.value));
        
        // Destroy previous chart instance if it exists
        if (dataChart) {
            dataChart.destroy();
        }

        // Create new Chart.js instance
        dataChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: series.title,
                    data: dataPoints,
                    borderColor: '#F6B17A',
                    backgroundColor: 'rgba(246, 177, 122, 0.1)',
                    fill: true,
                    tension: 0.2,
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#B3B3B3' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#B3B3B3' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                },
                animation: {
                    duration: 1500, // Chart "drawing" animation
                }
            }
        });
    };


    // --- UI HELPER FUNCTIONS ---
    const showLoader = () => loader.style.display = 'block';
    const hideLoader = () => loader.style.display = 'none';
    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    };
    const hideError = () => errorMessage.style.display = 'none';

    // --- GLOBAL FUNCTIONS ---
    // Make testSampleData available globally for HTML onclick
    window.testSampleData = function(searchTerm) {
        console.log('Testing sample data for:', searchTerm);
        displaySampleData(searchTerm);
    };

    // --- EVENT LISTENERS ---
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchSeries(searchTerm);
        }
    });
    
    // --- SCROLL ANIMATION OBSERVER ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
});