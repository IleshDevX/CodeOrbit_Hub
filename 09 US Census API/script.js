// US Census Data Explorer - Main JavaScript File
// Author: AI Assistant
// Version: 4.0.0 (Comparison Fix & Content Update)

class CensusDataExplorer {
    constructor() {
        this.apiKey = null; // US Census API doesn't require a key for most public datasets
        this.baseUrl = 'https://api.census.gov/data';
        this.currentData = null;
        this.charts = {};
        this.comparisonData = { locationA: null, locationB: null };

        // Switched to Data Profile (DP) variables for better accuracy and pre-calculated values
        this.variableMap = {
            population: { total: 'DP05_0001E' }, // Total Population
            gender: { male: 'DP05_0002E', female: 'DP05_0003E' },
            age: {
                total_pop: 'DP05_0001E', // Re-used for calculation
                pop_18_over: 'DP05_0019E',
                pop_65_over: 'DP05_0024E',
                median_age: 'DP05_0018E'
            },
            race: {
                hispanic: 'DP05_0071E',
                white: 'DP05_0077E',
                black: 'DP05_0078E',
                asian: 'DP05_0080E'
            },
            income: { median: 'DP03_0062E' }, // Median household income
            employment: {
                in_labor_force: 'DP03_0002E',
                unemployed: 'DP03_0005E'
            },
            housing_tenure: {
                owner_occupied: 'DP04_0046E',
                renter_occupied: 'DP04_0047E'
            },
            housing_value: { median: 'DP04_0089E' } // Median value (dollars)
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.hideLoadingScreen();
        this.populateYearDropdown();
        this.initializeChartsWithPlaceholder();
    }

    setupEventListeners() {
        // Navigation and Hero Search
        this.setupNavigation();
        document.getElementById('hero-search-btn').addEventListener('click', () => this.performHeroSearch(document.getElementById('hero-search').value));
        document.getElementById('hero-search').addEventListener('keypress', e => (e.key === 'Enter') && this.performHeroSearch(e.target.value));

        // Main Search
        document.getElementById('search-data-btn').addEventListener('click', () => this.performMainSearch());
        document.getElementById('clear-filters-btn').addEventListener('click', () => this.clearFilters());

        // Suggestions & Tabs
        document.querySelectorAll('.suggestion-tag').forEach(tag => tag.addEventListener('click', () => this.applySuggestion(tag.dataset.location, tag.dataset.type)));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => this.switchTab(btn.dataset.tab)));

        // Compare Functionality
        document.getElementById('add-location-a').addEventListener('click', () => this.addComparisonLocation('a', document.getElementById('compare-location-a').value));
        document.getElementById('add-location-b').addEventListener('click', () => this.addComparisonLocation('b', document.getElementById('compare-location-b').value));
        document.getElementById('compare-location-a').addEventListener('keypress', e => (e.key === 'Enter') && this.addComparisonLocation('a', e.target.value));
        document.getElementById('compare-location-b').addEventListener('keypress', e => (e.key === 'Enter') && this.addComparisonLocation('b', e.target.value));

        // Window Events
        window.addEventListener('scroll', () => this.handleScroll());
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                this.scrollToSection(link.getAttribute('href').substring(1));
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
        }, 1000);
    }
    
    populateYearDropdown() {
        const yearSelect = document.getElementById('data-year');
        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 2; year >= 2010; year--) {
            yearSelect.add(new Option(year, year));
        }
    }
    
    performHeroSearch(query) {
        if (!query.trim()) return;
        const [location, type] = query.includes(',') ? [query, 'place'] : [query, 'state'];
        document.getElementById('location-search').value = location;
        document.getElementById('location-type').value = type;
        this.scrollToSection('search');
        setTimeout(() => this.performMainSearch(), 300);
    }

    async performMainSearch() {
        this.showLoadingState('search-data-btn');
        const locationType = document.getElementById('location-type').value;
        const locationName = document.getElementById('location-search').value.trim();
        const year = document.getElementById('data-year').value;

        if (!locationName) {
            this.showError('Please enter a location name.');
            this.hideLoadingState('search-data-btn');
            return;
        }

        try {
            const rawDataRow = await this.fetchCensusData(locationType, locationName, year);
            if (rawDataRow) {
                const processedData = this.processCensusData(rawDataRow);
                this.currentData = { location: rawDataRow.NAME, data: processedData, year: year };
                this.displayResults();
                this.scrollToSection('visualizations');
            } else {
                this.showError(`Could not find data for "${locationName}". For cities or counties, please use the format "City, State" or "County, State".`);
            }
        } catch (error) {
            console.error('Search error:', error);
            this.showError(`An error occurred: ${error.message}. The Census API may be unavailable or blocked by your browser's security (CORS).`);
        } finally {
            this.hideLoadingState('search-data-btn');
        }
    }
    
    async fetchCensusData(locationType, locationName, year) {
        let apiUrl;
        let targetLocationName = locationName.toLowerCase();
        const endpoint = `/acs/acs5/profile`;
        
        const variables = ['NAME', ...new Set(Object.values(this.variableMap).flatMap(obj => Object.values(obj)))];

        if (locationType === 'state') {
            const stateFips = this.getStateFips(locationName);
            if (!stateFips) return null;
            apiUrl = `${this.baseUrl}/${year}${endpoint}?get=${variables.join(',')}&for=state:${stateFips}`;
        } else if ((locationType === 'place' || locationType === 'county') && locationName.includes(',')) {
            const parts = locationName.split(',').map(p => p.trim());
            targetLocationName = parts[0].toLowerCase();
            const stateName = parts[1];
            const stateFips = this.getStateFips(stateName);
            if (!stateFips) return null;
            apiUrl = `${this.baseUrl}/${year}${endpoint}?get=${variables.join(',')}&for=${locationType}:*&in=state:${stateFips}`;
        } else {
            return null; // Invalid format for city/county
        }

        console.log("Fetching from Census API:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

        const rawData = await response.json();
        if (!rawData || rawData.length < 2) return null;

        const headers = rawData[0];
        const dataRows = rawData.slice(1);

        const nameIndex = headers.indexOf('NAME');
        let foundRow = (locationType === 'state') 
            ? dataRows[0] 
            : dataRows.find(row => row[nameIndex].toLowerCase().includes(targetLocationName));

        if (!foundRow) return null;
        
        const dataMap = {};
        headers.forEach((header, index) => { dataMap[header] = foundRow[index]; });
        return dataMap;
    }

    processCensusData(dataMap) {
        const p = v => parseInt(v) || 0;

        // Age calculations
        const totalPop = p(dataMap[this.variableMap.age.total_pop]);
        const pop18over = p(dataMap[this.variableMap.age.pop_18_over]);
        const pop65over = p(dataMap[this.variableMap.age.pop_65_over]);
        const under18 = totalPop - pop18over;
        const age18to64 = pop18over - pop65over;

        // Employment calculations
        const inLaborForce = p(dataMap[this.variableMap.employment.in_labor_force]);
        const unemployed = p(dataMap[this.variableMap.employment.unemployed]);
        const employed = inLaborForce - unemployed;
        const notInLaborForce = totalPop > inLaborForce ? totalPop - inLaborForce : 0;
        
        return {
            overview: {
                population: [{ label: 'Total Population', value: totalPop }],
                age: [
                    { label: 'Under 18', value: under18 },
                    { label: '18-64', value: age18to64 },
                    { label: '65 and over', value: pop65over }
                ]
            },
            demographics: {
                gender: [
                    { label: 'Male', value: p(dataMap[this.variableMap.gender.male]) },
                    { label: 'Female', value: p(dataMap[this.variableMap.gender.female]) }
                ],
                race: [
                    { label: 'White (Non-Hisp)', value: p(dataMap[this.variableMap.race.white]) },
                    { label: 'Hispanic', value: p(dataMap[this.variableMap.race.hispanic]) },
                    { label: 'Black (Non-Hisp)', value: p(dataMap[this.variableMap.race.black]) },
                    { label: 'Asian (Non-Hisp)', value: p(dataMap[this.variableMap.race.asian]) }
                ]
            },
            economics: {
                income: [{ label: 'Median Household Income', value: p(dataMap[this.variableMap.income.median]) }],
                employment: [
                    { label: 'Employed', value: employed },
                    { label: 'Unemployed', value: unemployed },
                    { label: 'Not in Labor Force', value: notInLaborForce }
                ]
            },
            housing: {
                tenure: [
                    { label: 'Owner-Occupied', value: p(dataMap[this.variableMap.housing_tenure.owner_occupied]) },
                    { label: 'Renter-Occupied', value: p(dataMap[this.variableMap.housing_tenure.renter_occupied]) }
                ],
                value: [{ label: 'Median Housing Value', value: p(dataMap[this.variableMap.housing_value.median]) }]
            },
            table: [
                { metric: 'Total Population', value: this.formatNumber(totalPop) },
                { metric: 'Median Household Income', value: this.formatCurrency(p(dataMap[this.variableMap.income.median])) },
                { metric: 'Median Age', value: dataMap[this.variableMap.age.median_age] },
                { metric: 'Median Housing Value', value: this.formatCurrency(p(dataMap[this.variableMap.housing_value.median])) },
                { metric: 'In Labor Force', value: this.formatNumber(inLaborForce) },
                { metric: 'Owner-Occupied Housing', value: this.formatNumber(p(dataMap[this.variableMap.housing_tenure.owner_occupied])) },
            ]
        };
    }

    // --- DISPLAY & CHARTING ---
    displayResults() {
        document.getElementById('visualizations').style.display = 'block';
        this.updateDataTable();
        this.updateCharts();
    }

    updateDataTable() {
        const tableBody = document.getElementById('data-table-body');
        tableBody.innerHTML = '';
        this.currentData.data.table.forEach(point => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${point.metric}</td><td>${point.value}</td><td>N/A</td><td>N/A</td>`;
            tableBody.appendChild(row);
        });
    }

    updateCharts() {
        Object.values(this.charts).forEach(chart => chart?.destroy());
        const data = this.currentData.data;
        this.drawChart('population-chart', 'bar', data.overview.population, false);
        this.drawChart('age-chart', 'pie', data.overview.age);
        this.drawChart('gender-chart', 'pie', data.demographics.gender);
        this.drawChart('race-chart', 'bar', data.demographics.race);
        this.drawChart('income-chart', 'bar', data.economics.income, false);
        this.drawChart('employment-chart', 'pie', data.economics.employment);
        this.drawChart('tenure-chart', 'pie', data.housing.tenure);
        this.drawChart('values-chart', 'bar', data.housing.value, false);
    }
    
    drawChart(canvasId, type, data, showLegend = true) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;
        const labels = data.map(d => d.label);
        const values = data.map(d => d.value);
        const chartColors = ['#3684DB', '#B3D6F9', '#7588A5', '#223A59', '#D1DDED'];

        this.charts[canvasId] = new Chart(ctx, {
            type: type,
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: type === 'bar' ? 'rgba(54, 132, 219, 0.6)' : chartColors,
                    borderColor: type === 'bar' ? 'rgba(54, 132, 219, 1)' : '#031930',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: showLegend, position: 'top', labels: { color: '#B3D6F9', font: { size: 14 } } },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.label}: ${new Intl.NumberFormat('en-US').format(ctx.raw)}`
                        }
                    }
                },
                scales: (type === 'bar') ? {
                    y: { ticks: { color: '#B3D6F9' }, grid: { color: 'rgba(179, 214, 249, 0.1)' } },
                    x: { ticks: { color: '#B3D6F9' }, grid: { color: 'rgba(179, 214, 249, 0.1)' } }
                } : {}
            }
        });
    }

    initializeChartsWithPlaceholder() {
        document.querySelectorAll('.chart-wrapper canvas').forEach(canvas => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#7588A5';
            ctx.font = '16px "Segoe UI"';
            ctx.fillText("Search for a location to view data", canvas.width / 2, canvas.height / 2);
        });
    }

    // --- COMPARISON FUNCTIONALITY ---
    async addComparisonLocation(slot, locationName) {
        if (!locationName || !locationName.trim()) {
            this.showError('Please enter a location name.');
            return;
        }
    
        const buttonId = `add-location-${slot}`;
        this.showLoadingState(buttonId);
    
        try {
            const locationType = locationName.includes(',') ? 'place' : 'state';
            const year = document.getElementById('data-year').value || '2022';
            
            const rawDataRow = await this.fetchCensusData(locationType, locationName.trim(), year);
            
            if (rawDataRow) {
                const processedData = this.processCensusData(rawDataRow);
                
                this.comparisonData[`location${slot.toUpperCase()}`] = {
                    name: rawDataRow.NAME,
                    data: processedData
                };
    
                this.updateComparisonUI(slot, rawDataRow.NAME, processedData);
                
                if (this.comparisonData.locationA && this.comparisonData.locationB) {
                    this.showComparison();
                }
            } else {
                this.showError(`Could not find data for "${locationName}". Please check the spelling or format.`);
            }
        } catch (error) {
            console.error('Comparison error:', error);
            this.showError(`Failed to load data for "${locationName}".`);
        } finally {
            this.hideLoadingState(buttonId);
        }
    }

    updateComparisonUI(slot, locationName, data) {
        const nameElement = document.getElementById(`location-${slot}-name`);
        const statsElement = document.getElementById(`location-${slot}-stats`);
        
        nameElement.textContent = locationName;
        
        const employedStat = data.economics.employment.find(d => d.label === 'Employed')?.value || 0;
        const unemployedStat = data.economics.employment.find(d => d.label === 'Unemployed')?.value || 0;
        const medianAgeStat = data.table.find(d => d.metric === 'Median Age')?.value || 'N/A';
    
        const stats = [
            { label: 'Total Population', value: this.formatNumber(data.overview.population[0].value) },
            { label: 'Median Income', value: this.formatCurrency(data.economics.income[0].value) },
            { label: 'Median Age', value: medianAgeStat },
            { label: 'Employed', value: this.formatNumber(employedStat) },
            { label: 'Unemployed', value: this.formatNumber(unemployedStat) }
        ];
    
        statsElement.innerHTML = stats.map(stat => `
            <div class="stat-row">
                <span class="stat-label">${stat.label}</span>
                <span class="stat-value">${stat.value}</span>
            </div>
        `).join('');
    }

    showComparison() {
        const resultsContainer = document.getElementById('comparison-results');
        resultsContainer.style.display = 'block';
        this.createComparisonChart();
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    createComparisonChart() {
        const canvas = document.getElementById('comparison-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (this.charts['comparison-chart']) {
            this.charts['comparison-chart'].destroy();
        }
    
        const { locationA, locationB } = this.comparisonData;
        if (!locationA || !locationB) return;
    
        const comparisonMetrics = ['Total Population', 'Employed', 'Unemployed'];
    
        const dataA = [
            locationA.data.overview.population[0].value,
            locationA.data.economics.employment.find(d => d.label === 'Employed')?.value || 0,
            locationA.data.economics.employment.find(d => d.label === 'Unemployed')?.value || 0
        ];
    
        const dataB = [
            locationB.data.overview.population[0].value,
            locationB.data.economics.employment.find(d => d.label === 'Employed')?.value || 0,
            locationB.data.economics.employment.find(d => d.label === 'Unemployed')?.value || 0
        ];
    
        this.charts['comparison-chart'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: comparisonMetrics,
                datasets: [
                    { label: locationA.name, data: dataA, backgroundColor: 'rgba(54, 132, 219, 0.6)', borderColor: 'rgba(54, 132, 219, 1)', borderWidth: 1 },
                    { label: locationB.name, data: dataB, backgroundColor: 'rgba(179, 214, 249, 0.6)', borderColor: 'rgba(179, 214, 249, 1)', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top', labels: { color: '#B3D6F9', font: { size: 14 } } },
                    tooltip: { callbacks: { label: context => `${context.dataset.label || ''}: ${new Intl.NumberFormat('en-US').format(context.raw)}` } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#B3D6F9', callback: value => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value) },
                        grid: { color: 'rgba(179, 214, 249, 0.1)' }
                    },
                    x: { ticks: { color: '#B3D6F9' }, grid: { color: 'rgba(179, 214, 249, 0.1)' } }
                }
            }
        });
    }

    // --- UI & UTILITY ---
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    applySuggestion(location, type) {
        document.getElementById('location-type').value = type;
        document.getElementById('location-search').value = location;
        this.performMainSearch();
    }
    
    clearFilters() {
        document.getElementById('location-search').value = '';
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
    }
    
    handleScroll() {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 100);
    }
    
    showLoadingState(buttonId) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
        }
    }

    hideLoadingState(buttonId) {
        const btn = document.getElementById(buttonId);
        if (btn && btn.dataset.originalText) {
            btn.innerHTML = btn.dataset.originalText;
            btn.disabled = false;
        }
    }

    showError(message) {
        document.getElementById('error-message').textContent = message;
        document.getElementById('error-modal').classList.add('show');
    }

    formatNumber = num => num ? parseInt(num).toLocaleString('en-US') : 'N/A';
    formatCurrency = num => num ? parseInt(num).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A';

    getStateFips(stateName) {
        const stateCodes = { 'alabama': '01', 'alaska': '02', 'arizona': '04', 'arkansas': '05', 'california': '06', 'colorado': '08', 'connecticut': '09', 'delaware': '10', 'district of columbia': '11', 'florida': '12', 'georgia': '13', 'hawaii': '15', 'idaho': '16', 'illinois': '17', 'indiana': '18', 'iowa': '19', 'kansas': '20', 'kentucky': '21', 'louisiana': '22', 'maine': '23', 'maryland': '24', 'massachusetts': '25', 'michigan': '26', 'minnesota': '27', 'mississippi': '28', 'missouri': '29', 'montana': '30', 'nebraska': '31', 'nevada': '32', 'new hampshire': '33', 'new jersey': '34', 'new mexico': '35', 'new york': '36', 'north carolina': '37', 'north dakota': '38', 'ohio': '39', 'oklahoma': '40', 'oregon': '41', 'pennsylvania': '42', 'rhode island': '44', 'south carolina': '45', 'south dakota': '46', 'tennessee': '47', 'texas': '48', 'utah': '49', 'vermont': '50', 'virginia': '51', 'washington': '53', 'west virginia': '54', 'wisconsin': '55', 'wyoming': '56', 'al': '01', 'ak': '02', 'az': '04', 'ar': '05', 'ca': '06', 'co': '08', 'ct': '09', 'de': '10', 'dc': '11', 'fl': '12', 'ga': '13', 'hi': '15', 'id': '16', 'il': '17', 'in': '18', 'ia': '19', 'ks': '20', 'ky': '21', 'la': '22', 'me': '23', 'md': '24', 'ma': '25', 'mi': '26', 'mn': '27', 'ms': '28', 'mo': '29', 'mt': '30', 'ne': '31', 'nv': '32', 'nh': '33', 'nj': '34', 'nm': '35', 'ny': '36', 'nc': '37', 'nd': '38', 'oh': '39', 'ok': '40', 'or': '41', 'pa': '42', 'ri': '44', 'sc': '45', 'sd': '46', 'tn': '47', 'tx': '48', 'ut': '49', 'vt': '50', 'va': '51', 'wa': '53', 'wv': '54', 'wi': '55', 'wy': '56' };
        return stateCodes[stateName.toLowerCase()] || null;
    }
}

// --- GLOBAL EVENT HANDLERS ---
function scrollToSection(sectionId) { window.censusApp?.scrollToSection(sectionId); }
function performHeroSearchAction() { window.censusApp?.performHeroSearch(document.getElementById('hero-search').value); }
function closeModal() { document.getElementById('error-modal').classList.remove('show'); }
function exportChart(canvasId) { console.log(`Exporting ${canvasId}... Functionality to be implemented.`); }
function exportTable() { console.log(`Exporting table... Functionality to be implemented.`); }


document.addEventListener('DOMContentLoaded', () => {
    window.censusApp = new CensusDataExplorer();
    console.log('🇺🇸 US Census Data Explorer Initialized (v4.0)');
});
