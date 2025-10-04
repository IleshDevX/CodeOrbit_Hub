// Global variables
let allCountries = [];
let filteredCountries = [];
let currentCountries = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const regionFilter = document.getElementById('regionFilter');
const countriesGrid = document.getElementById('countriesGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

// API Configuration
const API_BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINTS = {
    all: `${API_BASE_URL}/all`,
    byName: (name) => `${API_BASE_URL}/name/${name}`,
    byRegion: (region) => `${API_BASE_URL}/region/${region}`,
    byCode: (code) => `${API_BASE_URL}/alpha/${code}`
};

// Fallback data for testing/offline use
const fallbackCountries = [
    {
        name: { common: 'United States', nativeName: { eng: { common: 'United States' } } },
        population: 331900000,
        region: 'Americas',
        subregion: 'North America',
        capital: ['Washington, D.C.'],
        tld: ['.us'],
        currencies: { USD: { name: 'United States dollar', symbol: '$' } },
        languages: { eng: 'English' },
        borders: ['CAN', 'MEX'],
        cca3: 'USA',
        area: 9833517,
        timezones: ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC+10:00', 'UTC+12:00'],
        description: 'The United States is a federal republic consisting of 50 states and a capital district. Known for its diverse geography, from vast plains to mountain ranges, and as a global leader in technology, entertainment, and innovation.'
    },
    {
        name: { common: 'India', nativeName: { hin: { common: 'भारत' } } },
        population: 1380004385,
        region: 'Asia',
        subregion: 'Southern Asia',
        capital: ['New Delhi'],
        tld: ['.in'],
        currencies: { INR: { name: 'Indian rupee', symbol: '₹' } },
        languages: { hin: 'Hindi', eng: 'English' },
        borders: ['AFG', 'BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK', 'LKA'],
        cca3: 'IND',
        area: 3287590,
        timezones: ['UTC+05:30'],
        description: 'India is the world\'s largest democracy and second-most populous country. Known for its rich cultural heritage, diverse religions, ancient civilization, and rapidly growing technology sector. Home to the Himalayas, diverse languages, and vibrant traditions.'
    },
    {
        name: { common: 'Germany', nativeName: { deu: { common: 'Deutschland' } } },
        population: 83240525,
        region: 'Europe',
        subregion: 'Central Europe',
        capital: ['Berlin'],
        tld: ['.de'],
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { deu: 'German' },
        borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
        cca3: 'DEU',
        area: 357114,
        timezones: ['UTC+01:00'],
        description: 'Germany is Europe\'s economic powerhouse and a leader in engineering, automotive industry, and renewable energy. Known for its rich history, cultural contributions, excellent education system, and beautiful castles and landscapes.'
    },
    {
        name: { common: 'Brazil', nativeName: { por: { common: 'Brasil' } } },
        population: 212559409,
        region: 'Americas',
        subregion: 'South America',
        capital: ['Brasília'],
        tld: ['.br'],
        currencies: { BRL: { name: 'Brazilian real', symbol: 'R$' } },
        languages: { por: 'Portuguese' },
        borders: ['ARG', 'BOL', 'COL', 'GUF', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN'],
        cca3: 'BRA',
        area: 8515767,
        timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00'],
        description: 'Brazil is the largest country in South America, famous for the Amazon rainforest, vibrant carnival celebrations, beautiful beaches, and passionate football culture. Home to incredible biodiversity and rich Portuguese colonial heritage.'
    },
    {
        name: { common: 'Japan', nativeName: { jpn: { common: '日本' } } },
        population: 125836021,
        region: 'Asia',
        subregion: 'Eastern Asia',
        capital: ['Tokyo'],
        tld: ['.jp'],
        currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
        languages: { jpn: 'Japanese' },
        borders: [],
        cca3: 'JPN',
        area: 377930,
        timezones: ['UTC+09:00'],
        description: 'Japan is an island nation known for its unique blend of ancient traditions and cutting-edge technology. Famous for anime, sushi, cherry blossoms, samurai history, and innovations in electronics and automotive industries.'
    },
    {
        name: { common: 'Australia', nativeName: { eng: { common: 'Australia' } } },
        population: 25687041,
        region: 'Oceania',
        subregion: 'Australia and New Zealand',
        capital: ['Canberra'],
        tld: ['.au'],
        currencies: { AUD: { name: 'Australian dollar', symbol: '$' } },
        languages: { eng: 'English' },
        borders: [],
        cca3: 'AUS',
        area: 7692024,
        timezones: ['UTC+05:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:00'],
        description: 'Australia is a continent-country known for its unique wildlife, stunning natural landscapes, and laid-back culture. Famous for the Great Barrier Reef, Outback, Sydney Opera House, and being home to kangaroos and koalas.'
    },
    {
        name: { common: 'Nigeria', nativeName: { eng: { common: 'Nigeria' } } },
        population: 206139587,
        region: 'Africa',
        subregion: 'Western Africa',
        capital: ['Abuja'],
        tld: ['.ng'],
        currencies: { NGN: { name: 'Nigerian naira', symbol: '₦' } },
        languages: { eng: 'English' },
        borders: ['BEN', 'CMR', 'TCD', 'NER'],
        cca3: 'NGA',
        area: 923768,
        timezones: ['UTC+01:00'],
        description: 'Nigeria is Africa\'s most populous country and largest economy. Known for its vibrant culture, Nollywood film industry, diverse ethnic groups, rich musical heritage, and significant oil reserves. A major player in African politics and economics.'
    },
    {
        name: { common: 'France', nativeName: { fra: { common: 'France' } } },
        population: 67391582,
        region: 'Europe',
        subregion: 'Western Europe',
        capital: ['Paris'],
        tld: ['.fr'],
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { fra: 'French' },
        borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
        cca3: 'FRA',
        area: 551695,
        timezones: ['UTC-10:00', 'UTC-09:30', 'UTC-09:00', 'UTC-08:00', 'UTC-04:00', 'UTC-03:00', 'UTC+01:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+11:00', 'UTC+12:00'],
        description: 'France is renowned for its art, culture, cuisine, and fashion. Home to the Eiffel Tower, Louvre Museum, and beautiful countryside. Known for wine, cheese, romance, and significant contributions to philosophy, literature, and human rights.'
    },
    {
        name: { common: 'United Kingdom', nativeName: { eng: { common: 'United Kingdom' } } },
        population: 67886011,
        region: 'Europe',
        subregion: 'Northern Europe',
        capital: ['London'],
        tld: ['.uk'],
        currencies: { GBP: { name: 'British pound', symbol: '£' } },
        languages: { eng: 'English' },
        borders: ['IRL'],
        cca3: 'GBR',
        area: 242495,
        timezones: ['UTC-08:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC+00:00', 'UTC+01:00', 'UTC+06:00'],
        description: 'The United Kingdom is a constitutional monarchy comprising England, Scotland, Wales, and Northern Ireland. Known for its royal family, rich history, Shakespeare, The Beatles, and significant cultural influence worldwide.'
    },
    {
        name: { common: 'South Korea', nativeName: { kor: { common: '대한민국' } } },
        population: 51780579,
        region: 'Asia',
        subregion: 'Eastern Asia',
        capital: ['Seoul'],
        tld: ['.kr'],
        currencies: { KRW: { name: 'South Korean won', symbol: '₩' } },
        languages: { kor: 'Korean' },
        borders: ['PRK'],
        cca3: 'KOR',
        area: 100210,
        timezones: ['UTC+09:00'],
        description: 'South Korea is a highly developed country known for its technological innovations, K-pop music, Korean dramas, delicious cuisine like kimchi and bulgogi, and major tech companies like Samsung and LG.'
    },
    {
        name: { common: 'Mexico', nativeName: { spa: { common: 'México' } } },
        population: 128932753,
        region: 'Americas',
        subregion: 'North America',
        capital: ['Mexico City'],
        tld: ['.mx'],
        currencies: { MXN: { name: 'Mexican peso', symbol: '$' } },
        languages: { spa: 'Spanish' },
        borders: ['BLZ', 'GTM', 'USA'],
        cca3: 'MEX',
        area: 1964375,
        timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00'],
        description: 'Mexico is a vibrant country known for its ancient Mayan and Aztec civilizations, colorful Day of the Dead celebrations, delicious tacos and tequila, beautiful beaches, and rich artistic traditions.'
    },
    {
        name: { common: 'Egypt', nativeName: { ara: { common: 'مصر' } } },
        population: 102334404,
        region: 'Africa',
        subregion: 'Northern Africa',
        capital: ['Cairo'],
        tld: ['.eg'],
        currencies: { EGP: { name: 'Egyptian pound', symbol: '£' } },
        languages: { ara: 'Arabic' },
        borders: ['ISR', 'LBY', 'SDN'],
        cca3: 'EGY',
        area: 1002450,
        timezones: ['UTC+02:00'],
        description: 'Egypt is home to one of the world\'s oldest civilizations, famous for the Great Pyramids of Giza, the Sphinx, ancient pharaohs, the Nile River, and incredible archaeological treasures that continue to fascinate the world.'
    },
    {
        name: { common: 'Canada', nativeName: { eng: { common: 'Canada' }, fra: { common: 'Canada' } } },
        population: 38005238,
        region: 'Americas',
        subregion: 'North America',
        capital: ['Ottawa'],
        tld: ['.ca'],
        currencies: { CAD: { name: 'Canadian dollar', symbol: '$' } },
        languages: { eng: 'English', fra: 'French' },
        borders: ['USA'],
        cca3: 'CAN',
        area: 9984670,
        timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
        description: 'Canada is the second-largest country by area, known for its stunning natural beauty, maple syrup, ice hockey, friendly people, multiculturalism, and pristine wilderness including the Rocky Mountains and Niagara Falls.'
    },
    {
        name: { common: 'Italy', nativeName: { ita: { common: 'Italia' } } },
        population: 59554023,
        region: 'Europe',
        subregion: 'Southern Europe',
        capital: ['Rome'],
        tld: ['.it'],
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { ita: 'Italian' },
        borders: ['AUT', 'FRA', 'SMR', 'SVN', 'CHE', 'VAT'],
        cca3: 'ITA',
        area: 301336,
        timezones: ['UTC+01:00'],
        description: 'Italy is renowned for its rich history, art, architecture, and cuisine. Home to the Roman Empire, Renaissance masters like Leonardo da Vinci, iconic landmarks like the Colosseum and Leaning Tower of Pisa, and world-famous pasta and pizza.'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupScrollAnimations();
});

// Initialize application
async function initializeApp() {
    try {
        await loadCountries();
        hideLoading();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showError();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Region filter
    regionFilter.addEventListener('change', handleRegionFilter);
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    setupNavigationLinks();
    
    // Modal controls
    closeModal.addEventListener('click', closeCountryModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeCountryModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeCountryModal();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', debounce(handleResize, 250));
}

// Load countries from API
async function loadCountries() {
    try {
        showLoading();
        
        // Try to fetch from API first
        let countries;
        let isUsingFallback = false;
        
        try {
            console.log('Attempting to fetch from REST Countries API...');
            const response = await fetch(ENDPOINTS.all, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                cache: 'default'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            countries = await response.json();
            console.log(`Successfully loaded ${countries.length} countries from REST Countries API`);
            
            // Verify we have valid data
            if (!Array.isArray(countries) || countries.length === 0) {
                throw new Error('Invalid API response: empty or malformed data');
            }
            
        } catch (fetchError) {
            console.warn('Failed to fetch from REST Countries API:', fetchError.message);
            console.log('Using fallback country data...');
            
            // Use fallback data if API fails
            countries = fallbackCountries;
            isUsingFallback = true;
            
            // Show a notice to the user
            showApiNotice();
        }
        
        // Process and sort countries
        allCountries = countries
            .filter(country => country.name && (country.name.common || country.name.official))
            .map(country => processCountryData(country))
            .sort((a, b) => a.name.localeCompare(b.name));
        
        filteredCountries = [...allCountries];
        displayCountries(filteredCountries);
        
        console.log(`Processed ${allCountries.length} countries for display`);
        
        // Update statistics if using real API data
        if (!isUsingFallback) {
            updateStatistics(allCountries);
        }
        
    } catch (error) {
        console.error('Error loading countries:', error);
        showError();
        throw error;
    }
}

// Update statistics with real data
function updateStatistics(countries) {
    try {
        const totalPopulation = countries.reduce((sum, country) => sum + (country.population || 0), 0);
        const regions = [...new Set(countries.map(c => c.region).filter(r => r && r !== 'Unknown'))];
        const languages = [...new Set(countries.flatMap(c => 
            c.languages ? Object.values(c.languages) : []
        ))];
        
        // Update stat displays if elements exist
        const statItems = document.querySelectorAll('.stat-item');
        if (statItems.length >= 4) {
            statItems[0].querySelector('.stat-number').textContent = countries.length;
            statItems[0].querySelector('.stat-label').textContent = 'Countries';
            
            statItems[1].querySelector('.stat-number').textContent = 
                totalPopulation > 1000000000 ? `${(totalPopulation / 1000000000).toFixed(1)}B` : 
                totalPopulation > 1000000 ? `${(totalPopulation / 1000000).toFixed(0)}M` : 
                totalPopulation.toLocaleString();
            statItems[1].querySelector('.stat-label').textContent = 'Total Population';
            
            statItems[2].querySelector('.stat-number').textContent = regions.length;
            statItems[2].querySelector('.stat-label').textContent = 'Regions';
            
            statItems[3].querySelector('.stat-number').textContent = languages.length;
            statItems[3].querySelector('.stat-label').textContent = 'Languages';
        }
    } catch (error) {
        console.warn('Error updating statistics:', error);
    }
}

// Process country data
function processCountryData(country) {
    return {
        name: country.name.common,
        nativeName: getNativeName(country.name.nativeName),
        population: country.population || 0,
        region: country.region || 'Unknown',
        subregion: country.subregion || 'Unknown',
        capital: Array.isArray(country.capital) ? country.capital[0] : country.capital || 'N/A',
        topLevelDomain: country.tld ? country.tld[0] : 'N/A',
        currencies: getCurrencies(country.currencies),
        languages: getLanguages(country.languages),
        borders: country.borders || [],
        cca3: country.cca3,
        area: country.area || 0,
        timezones: country.timezones || [],
        description: country.description || getCountryDescription(country.name.common)
    };
}

// Helper functions for data processing
function getNativeName(nativeNames) {
    if (!nativeNames) return 'N/A';
    const firstKey = Object.keys(nativeNames)[0];
    return nativeNames[firstKey]?.common || 'N/A';
}

function getCurrencies(currencies) {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
        .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
        .join(', ');
}

function getLanguages(languages) {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
}

// Generate country description
function getCountryDescription(countryName) {
    const descriptions = {
        'Afghanistan': 'A landlocked country in Central and South Asia, known for its mountainous terrain and rich history along the Silk Road.',
        'Albania': 'A country in Southeast Europe known for its stunning coastline along the Adriatic and Ionian seas, and rich cultural heritage.',
        'Algeria': 'The largest country in Africa, known for the Sahara Desert and Mediterranean coastline.',
        'Argentina': 'South American country famous for tango, beef, wine, and diverse landscapes from Patagonia to the Andes.',
        'Armenia': 'A landlocked country in the South Caucasus, known for being the first nation to adopt Christianity as state religion.',
        'Austria': 'A landlocked country in Central Europe, famous for classical music, Alpine scenery, and imperial architecture.',
        'Bangladesh': 'A South Asian country known for its lush greenery, rivers, and rich cultural traditions.',
        'Belgium': 'A Western European country famous for chocolate, waffles, beer, and medieval towns.',
        'Canada': 'The second-largest country by area, known for natural beauty, maple syrup, and multicultural society.',
        'China': 'The world\'s most populous country, known for ancient civilization, Great Wall, and rapid economic development.',
        'Egypt': 'A transcontinental country famous for ancient pyramids, the Nile River, and rich pharaonic history.',
        'Italy': 'A Mediterranean country known for art, architecture, cuisine, and Roman history.',
        'Mexico': 'A North American country famous for ancient civilizations, vibrant culture, and delicious cuisine.',
        'Russia': 'The largest country in the world, spanning eleven time zones with rich cultural heritage and vast landscapes.',
        'Spain': 'A European country known for flamenco, paella, beautiful beaches, and historic cities.',
        'Turkey': 'A transcontinental country bridging Europe and Asia, known for rich history and cultural diversity.',
        'United Kingdom': 'An island nation comprising England, Scotland, Wales, and Northern Ireland, known for monarchy and cultural influence.',
        'South Korea': 'A highly developed country known for its technological innovations, K-pop music, Korean dramas, and delicious cuisine.',
        'Thailand': 'Known as the Land of Smiles, famous for beautiful temples, delicious street food, tropical beaches, and warm hospitality.',
        'Vietnam': 'A Southeast Asian country known for its stunning landscapes, rich history, pho soup, and resilient culture.',
        'Indonesia': 'The world\'s largest archipelago, known for diverse cultures, tropical islands, Bali, and rich biodiversity.',
        'Philippines': 'An archipelago of over 7,000 islands, known for beautiful beaches, friendly people, and rich cultural heritage.',
        'Malaysia': 'A Southeast Asian country known for cultural diversity, modern cities, tropical rainforests, and delicious cuisine.',
        'Singapore': 'A city-state known for its modern skyline, multicultural society, excellent food scene, and economic success.',
        'New Zealand': 'Known for stunning natural landscapes, adventure sports, Maori culture, and being the filming location for Lord of the Rings.',
        'Switzerland': 'Famous for the Alps, chocolate, watches, banking, and pristine natural beauty.',
        'Norway': 'Known for fjords, Northern Lights, Viking heritage, and high quality of life.',
        'Sweden': 'Famous for IKEA, meatballs, beautiful archipelagos, and progressive social policies.',
        'Denmark': 'Known for Viking history, hygge lifestyle, LEGO, and beautiful coastal landscapes.',
        'Netherlands': 'Famous for tulips, windmills, canals, bicycles, and liberal social attitudes.',
        'Portugal': 'Known for beautiful coastlines, port wine, fado music, and rich maritime history.',
        'Greece': 'The cradle of Western civilization, famous for ancient ruins, beautiful islands, and Mediterranean cuisine.',
        'Poland': 'A Central European country with rich history, beautiful medieval cities, and resilient culture.',
        'Czech Republic': 'Known for beautiful Prague, beer culture, rich history, and stunning architecture.',
        'Hungary': 'Famous for Budapest, thermal baths, goulash, and rich cultural traditions.',
        'Romania': 'Known for Dracula legends, beautiful castles, Carpathian Mountains, and rich folklore.',
        'Bulgaria': 'Famous for rose oil, beautiful mountains, Black Sea coast, and ancient Thracian heritage.',
        'Croatia': 'Known for stunning Adriatic coastline, beautiful islands, medieval cities, and Game of Thrones filming locations.',
        'Serbia': 'A Balkan country known for rich history, vibrant nightlife, delicious cuisine, and warm hospitality.',
        'Bosnia and Herzegovina': 'Known for cultural diversity, beautiful landscapes, historic cities, and resilient spirit.',
        'Montenegro': 'A small Balkan country famous for dramatic mountains, beautiful coastline, and pristine nature.',
        'Albania': 'Known for stunning coastline, Albanian Alps, rich history, and growing tourism.',
        'North Macedonia': 'Famous for ancient history, beautiful lakes, and the birthplace of Mother Teresa.',
        'Slovenia': 'Known for Lake Bled, Ljubljana, wine regions, and beautiful Alpine scenery.',
        'Slovakia': 'Famous for castles, mountains, folk culture, and beautiful medieval towns.',
        'Estonia': 'A Baltic country known for digital innovation, medieval Tallinn, and beautiful islands.',
        'Latvia': 'Known for Art Nouveau architecture in Riga, beautiful beaches, and rich cultural heritage.',
        'Lithuania': 'Famous for baroque Vilnius, basketball culture, and Baltic Sea coastline.',
        'Finland': 'Known for saunas, Northern Lights, beautiful lakes, and high quality of life.',
        'Iceland': 'Famous for geysers, glaciers, Northern Lights, and dramatic volcanic landscapes.',
        'Ireland': 'Known for green landscapes, friendly people, Guinness, and rich literary tradition.',
        'Morocco': 'Famous for colorful markets, Sahara Desert, beautiful riads, and rich Berber culture.',
        'Tunisia': 'Known for ancient Carthage, beautiful beaches, and Star Wars filming locations.',
        'Libya': 'A North African country with rich history, Sahara Desert, and ancient Roman ruins.',
        'Sudan': 'Known for ancient Nubian civilization, the Nile confluence, and rich cultural diversity.',
        'Ethiopia': 'Famous for being the birthplace of coffee, ancient history, and unique cultural traditions.',
        'Kenya': 'Known for wildlife safaris, Maasai culture, beautiful landscapes, and long-distance runners.',
        'Tanzania': 'Famous for Serengeti, Mount Kilimanjaro, Zanzibar, and incredible wildlife.',
        'Uganda': 'Known as the Pearl of Africa, famous for mountain gorillas and beautiful landscapes.',
        'Rwanda': 'Known for mountain gorillas, beautiful hills, and remarkable post-genocide recovery.',
        'Ghana': 'Famous for gold, cocoa, vibrant culture, and being a stable democracy in West Africa.',
        'Senegal': 'Known for rich musical traditions, beautiful coastline, and vibrant cultural scene.',
        'Mali': 'Famous for ancient empires, Timbuktu, rich musical heritage, and Dogon culture.',
        'Burkina Faso': 'Known for traditional masks, vibrant markets, and rich cultural diversity.',
        'Niger': 'A Sahel country known for uranium mining, diverse cultures, and ancient trade routes.',
        'Chad': 'Known for Lake Chad, diverse ecosystems, and rich cultural heritage.',
        'Central African Republic': 'Famous for diverse wildlife, diamond mining, and rich cultural traditions.',
        'Cameroon': 'Known as Africa in miniature for its diverse landscapes, cultures, and languages.',
        'Equatorial Guinea': 'A small Central African country known for oil wealth and tropical forests.',
        'Gabon': 'Famous for pristine rainforests, diverse wildlife, and oil resources.',
        'Republic of the Congo': 'Known for Congo River, rainforests, and rich cultural heritage.',
        'Democratic Republic of the Congo': 'Famous for vast rainforests, mineral wealth, and diverse cultures.',
        'Angola': 'Known for oil wealth, beautiful coastline, and rich Portuguese colonial heritage.',
        'Zambia': 'Famous for Victoria Falls, copper mining, and diverse wildlife.',
        'Zimbabwe': 'Known for Victoria Falls, ancient ruins, and rich cultural heritage.',
        'Botswana': 'Famous for Okavango Delta, diamonds, and stable democracy.',
        'Namibia': 'Known for Namib Desert, dramatic landscapes, and diverse wildlife.',
        'South Africa': 'Famous for diverse cultures, wine regions, safari, and Nelson Mandela\'s legacy.',
        'Lesotho': 'A mountainous kingdom known for beautiful highlands and traditional culture.',
        'Eswatini': 'Formerly Swaziland, known for traditional monarchy and beautiful landscapes.',
        'Mozambique': 'Famous for beautiful coastline, Portuguese heritage, and rich marine life.',
        'Madagascar': 'Known for unique wildlife, baobab trees, and incredible biodiversity.',
        'Mauritius': 'A tropical paradise known for beautiful beaches, multicultural society, and luxury resorts.',
        'Seychelles': 'Famous for pristine beaches, unique granite formations, and luxury tourism.',
        'Comoros': 'Known for beautiful islands, ylang-ylang perfume, and rich cultural blend.',
        'São Tomé and Príncipe': 'A small island nation famous for cocoa, beautiful beaches, and Portuguese heritage.'
    };
    
    return descriptions[countryName] || `${countryName} is a beautiful country with its own unique culture, history, and traditions.`;
}

// Display countries in grid
function displayCountries(countries) {
    currentCountries = countries;
    countriesGrid.innerHTML = '';
    
    if (countries.length === 0) {
        countriesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No countries found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    countries.forEach((country, index) => {
        const countryCard = createCountryCard(country, index);
        countriesGrid.appendChild(countryCard);
    });
    
    // Trigger animation
    animateCards();
}

// Create country card element
function createCountryCard(country, index) {
    const card = document.createElement('div');
    card.className = 'country-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="country-header">
            <div class="country-icon">
                <i class="fas fa-globe-americas"></i>
            </div>
            <h3 class="country-name">${country.name}</h3>
        </div>
        <div class="country-info">
            <div class="country-description">
                <p>${country.description}</p>
            </div>
            <div class="country-details">
                <div class="country-detail">
                    <i class="fas fa-users"></i>
                    <span><strong>Population:</strong> ${formatNumber(country.population)}</span>
                </div>
                <div class="country-detail">
                    <i class="fas fa-globe"></i>
                    <span><strong>Region:</strong> ${country.region}</span>
                </div>
                <div class="country-detail">
                    <i class="fas fa-city"></i>
                    <span><strong>Capital:</strong> ${country.capital}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click event listener
    card.addEventListener('click', () => openCountryModal(country));
    
    // Add keyboard navigation
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCountryModal(country);
        }
    });
    
    return card;
}

// Open country detail modal
async function openCountryModal(country) {
    try {
        const detailedCountry = await getCountryDetails(country);
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-country-icon">
                    <i class="fas fa-globe-americas"></i>
                </div>
                <div class="modal-title-section">
                    <h2 class="modal-country-name">${detailedCountry.name}</h2>
                    <p class="modal-native-name">${detailedCountry.nativeName}</p>
                </div>
            </div>
            
            <div class="modal-description">
                <h4>About ${detailedCountry.name}</h4>
                <p>${detailedCountry.description}</p>
            </div>
            
            <div class="modal-details">
                <div class="detail-group">
                    <h4>Basic Information</h4>
                    <div class="detail-item">
                        <i class="fas fa-users"></i>
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">${formatNumber(detailedCountry.population)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-globe"></i>
                        <span class="detail-label">Region:</span>
                        <span class="detail-value">${detailedCountry.region}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map"></i>
                        <span class="detail-label">Subregion:</span>
                        <span class="detail-value">${detailedCountry.subregion}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-city"></i>
                        <span class="detail-label">Capital:</span>
                        <span class="detail-value">${detailedCountry.capital}</span>
                    </div>
                </div>
                
                <div class="detail-group">
                    <h4>Additional Details</h4>
                    <div class="detail-item">
                        <i class="fas fa-link"></i>
                        <span class="detail-label">Domain:</span>
                        <span class="detail-value">${detailedCountry.topLevelDomain}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-coins"></i>
                        <span class="detail-label">Currencies:</span>
                        <span class="detail-value">${detailedCountry.currencies}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-language"></i>
                        <span class="detail-label">Languages:</span>
                        <span class="detail-value">${detailedCountry.languages}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span class="detail-label">Area:</span>
                        <span class="detail-value">${formatNumber(detailedCountry.area)} km²</span>
                    </div>
                </div>
            </div>
            
            ${detailedCountry.borders.length > 0 ? `
                <div class="border-countries">
                    <h4>Border Countries</h4>
                    <div class="border-tags" id="borderTags">
                        ${await generateBorderTags(detailedCountry.borders)}
                    </div>
                </div>
            ` : ''}
        `;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add event listeners to border country tags
        const borderTags = document.querySelectorAll('.border-tag');
        borderTags.forEach(tag => {
            tag.addEventListener('click', async () => {
                const countryCode = tag.dataset.code;
                try {
                    const borderCountry = await fetchCountryByCode(countryCode);
                    if (borderCountry) {
                        openCountryModal(borderCountry);
                    }
                } catch (error) {
                    console.error('Error loading border country:', error);
                }
            });
        });
        
    } catch (error) {
        console.error('Error opening modal:', error);
        // Show a simplified modal with available data
        showSimpleModal(country);
    }
}

// Generate border country tags
async function generateBorderTags(borderCodes) {
    // Common border country mappings for fallback
    const borderCountryNames = {
        'USA': 'United States', 'CAN': 'Canada', 'MEX': 'Mexico',
        'IND': 'India', 'CHN': 'China', 'PAK': 'Pakistan', 'BGD': 'Bangladesh',
        'DEU': 'Germany', 'FRA': 'France', 'POL': 'Poland', 'AUT': 'Austria',
        'BRA': 'Brazil', 'ARG': 'Argentina', 'COL': 'Colombia', 'VEN': 'Venezuela',
        'JPN': 'Japan', 'KOR': 'South Korea', 'PRK': 'North Korea',
        'AUS': 'Australia', 'NZL': 'New Zealand', 'PNG': 'Papua New Guinea',
        'NGA': 'Nigeria', 'BEN': 'Benin', 'CMR': 'Cameroon', 'TCD': 'Chad',
        'ESP': 'Spain', 'PRT': 'Portugal', 'ITA': 'Italy', 'CHE': 'Switzerland'
    };
    
    const borderPromises = borderCodes.slice(0, 8).map(async (code) => {
        try {
            const response = await fetch(ENDPOINTS.byCode(code));
            if (response.ok) {
                const data = await response.json();
                const country = Array.isArray(data) ? data[0] : data;
                return `<button class="border-tag" data-code="${code}">${country.name.common}</button>`;
            }
        } catch (error) {
            console.error(`Error fetching border country ${code}:`, error);
        }
        
        // Use fallback name if available
        const fallbackName = borderCountryNames[code] || code;
        return `<button class="border-tag" data-code="${code}">${fallbackName}</button>`;
    });
    
    const borderTags = await Promise.all(borderPromises);
    return borderTags.join('');
}

// Get detailed country information
async function getCountryDetails(country) {
    // Return the country data we already have
    return country;
}

// Fetch country by code
async function fetchCountryByCode(code) {
    try {
        const response = await fetch(ENDPOINTS.byCode(code));
        if (response.ok) {
            const data = await response.json();
            const country = Array.isArray(data) ? data[0] : data;
            return processCountryData(country);
        }
    } catch (error) {
        console.error(`Error fetching country by code ${code}:`, error);
    }
    return null;
}

// Close country modal
function closeCountryModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle search input
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedRegion = regionFilter.value;
    
    filterCountries(searchTerm, selectedRegion);
}

// Handle region filter
function handleRegionFilter() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedRegion = regionFilter.value;
    
    filterCountries(searchTerm, selectedRegion);
}

// Filter countries based on search and region
function filterCountries(searchTerm, region) {
    let filtered = [...allCountries];
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(country =>
            country.name.toLowerCase().includes(searchTerm) ||
            country.capital.toLowerCase().includes(searchTerm) ||
            country.region.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by region
    if (region) {
        filtered = filtered.filter(country => country.region === region);
    }
    
    filteredCountries = filtered;
    displayCountries(filteredCountries);
}

// Mobile menu management
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    
    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Setup navigation links
function setupNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Utility functions
function formatNumber(num) {
    if (num === 0) return '0';
    return new Intl.NumberFormat().format(num);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading and error states
function showLoading() {
    loadingSpinner.style.display = 'flex';
    countriesGrid.style.display = 'none';
    errorMessage.style.display = 'none';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
    countriesGrid.style.display = 'grid';
    errorMessage.style.display = 'none';
}

function showError() {
    loadingSpinner.style.display = 'none';
    countriesGrid.style.display = 'none';
    errorMessage.style.display = 'block';
}

// Show API notice when using fallback data
function showApiNotice() {
    const notice = document.createElement('div');
    notice.className = 'api-notice';
    notice.innerHTML = `
        <div class="notice-content">
            <i class="fas fa-info-circle"></i>
            <span>Using sample data due to API connection issues. Some features may be limited.</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notice-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notice);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notice.parentElement) {
            notice.remove();
        }
    }, 5000);
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.fade-in, .blur-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add scroll-triggered animations for search section
    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
        searchSection.classList.add('fade-in');
        observer.observe(searchSection);
    }
}

// Animate country cards
function animateCards() {
    const cards = document.querySelectorAll('.country-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 50);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle window resize
function handleResize() {
    // Recalculate any layout-dependent elements if needed
    console.log('Window resized');
}

// Show simple modal fallback
function showSimpleModal(country) {
    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-country-icon">
                <i class="fas fa-globe-americas"></i>
            </div>
            <div class="modal-title-section">
                <h2 class="modal-country-name">${country.name}</h2>
                <p class="modal-native-name">${country.nativeName}</p>
            </div>
        </div>
        
        <div class="modal-description">
            <h4>About ${country.name}</h4>
            <p>${country.description}</p>
        </div>
        
        <div class="modal-details">
            <div class="detail-group">
                <h4>Basic Information</h4>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span class="detail-label">Population:</span>
                    <span class="detail-value">${formatNumber(country.population)}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-globe"></i>
                    <span class="detail-label">Region:</span>
                    <span class="detail-value">${country.region}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-city"></i>
                    <span class="detail-label">Capital:</span>
                    <span class="detail-value">${country.capital}</span>
                </div>
            </div>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add CSS for no results display
const noResultsCSS = `
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 80px 0;
        color: var(--text-secondary);
    }
    
    .no-results i {
        font-size: 4rem;
        color: var(--gradient-3);
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .no-results h3 {
        font-size: 1.8rem;
        margin-bottom: 10px;
        color: var(--text-primary);
    }
    
    .no-results p {
        font-size: 1.1rem;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = noResultsCSS;
document.head.appendChild(style);

// Footer functionality
function showRandomCountry() {
    if (allCountries.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    const randomCountry = allCountries[randomIndex];
    
    // Scroll to countries section and open modal
    scrollToSection('search-section');
    setTimeout(() => {
        openCountryModal(randomCountry);
    }, 500);
}

function filterByRegion(region) {
    // Set the region filter
    regionFilter.value = region;
    
    // Scroll to search section
    scrollToSection('search-section');
    
    // Apply the filter
    setTimeout(() => {
        handleRegionFilter();
    }, 300);
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.loadCountries = loadCountries;
window.showRandomCountry = showRandomCountry;
window.filterByRegion = filterByRegion;