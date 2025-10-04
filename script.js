// Project Data
const projects = [
    {
        id: 1,
        name: "REST Countries",
        folder: "01 REST Countries",
        description: "Explore detailed information about countries worldwide with interactive search and filtering.",
        category: "data-apis",
        tags: ["REST API", "Countries", "Geography", "Data"],
        icon: "fas fa-globe-americas",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        name: "Open-Meteo Weather",
        folder: "02 Open-Meteo",
        description: "Real-time weather data and forecasts using the Open-Meteo API.",
        category: "geography-weather",
        tags: ["Weather", "API", "Forecast", "Climate"],
        icon: "fas fa-cloud-sun",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        name: "IP Info Locator",
        folder: "03 Ipinfo-io",
        description: "Get detailed information about IP addresses including location and ISP data.",
        category: "development-tools",
        tags: ["IP", "Location", "Network", "Tools"],
        icon: "fas fa-map-marker-alt",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        name: "Cat Facts",
        folder: "04 Cat Facts",
        description: "Discover interesting and fun facts about cats with this delightful API.",
        category: "media-entertainment",
        tags: ["Cats", "Facts", "Fun", "Animals"],
        icon: "fas fa-cat",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        name: "Dog CEO API",
        folder: "05 Dog CEO API",
        description: "Browse through thousands of dog images organized by breeds.",
        category: "media-entertainment",
        tags: ["Dogs", "Images", "Breeds", "Animals"],
        icon: "fas fa-dog",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        name: "Wikipedia Search",
        folder: "06 Wikipedia API",
        description: "Search and explore Wikipedia articles with rich content display.",
        category: "data-apis",
        tags: ["Wikipedia", "Search", "Knowledge", "Articles"],
        icon: "fab fa-wikipedia-w",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 7,
        name: "Open Library",
        folder: "07 Open Library API",
        description: "Search for books and access detailed bibliographic information.",
        category: "data-apis",
        tags: ["Books", "Library", "Search", "Literature"],
        icon: "fas fa-book",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 8,
        name: "US Census Data",
        folder: "09 US Census API",
        description: "Access comprehensive US demographic and economic data.",
        category: "data-apis",
        tags: ["Census", "Demographics", "Statistics", "USA"],
        icon: "fas fa-chart-bar",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 9,
        name: "World Bank Data",
        folder: "10 World Bank API",
        description: "Explore global development indicators and economic data.",
        category: "finance-economics",
        tags: ["World Bank", "Economics", "Development", "Data"],
        icon: "fas fa-university",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 10,
        name: "CoinGecko Crypto",
        folder: "11 CoinGecko API",
        description: "Track cryptocurrency prices and market data in real-time.",
        category: "finance-economics",
        tags: ["Cryptocurrency", "Prices", "Market", "Trading"],
        icon: "fab fa-bitcoin",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 11,
        name: "Exchange Rates",
        folder: "12 ExchangeRate-host",
        description: "Get current and historical currency exchange rates.",
        category: "finance-economics",
        tags: ["Currency", "Exchange", "Rates", "Finance"],
        icon: "fas fa-exchange-alt",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 12,
        name: "FRED Economic Data",
        folder: "13 FRED API",
        description: "Visualize economic indicators from the Federal Reserve Economic Data.",
        category: "finance-economics",
        tags: ["Economics", "FRED", "Charts", "Federal Reserve"],
        icon: "fas fa-chart-line",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 13,
        name: "NASA APIs",
        folder: "14 NASA APIs",
        description: "Explore space with NASA's collection of astronomical data and images.",
        category: "science-research",
        tags: ["NASA", "Space", "Astronomy", "Science"],
        icon: "fas fa-rocket",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 14,
        name: "TheMealDB",
        folder: "15 TheMealDB",
        description: "Discover recipes and meal ideas from around the world.",
        category: "media-entertainment",
        tags: ["Recipes", "Food", "Cooking", "Meals"],
        icon: "fas fa-utensils",
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 15,
        name: "USGS Earthquakes",
        folder: "16 USGS Earthquake API",
        description: "Track recent earthquakes and seismic activity worldwide.",
        category: "science-research",
        tags: ["Earthquakes", "Geology", "USGS", "Natural Disasters"],
        icon: "fas fa-mountain",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 16,
        name: "OMDb Movies",
        folder: "17 OMDb API",
        description: "Search for movies and TV shows with detailed information.",
        category: "media-entertainment",
        tags: ["Movies", "TV Shows", "Entertainment", "Database"],
        icon: "fas fa-film",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 17,
        name: "TVMaze Shows",
        folder: "18 TVMaze API",
        description: "Comprehensive TV show database with episodes and cast information.",
        category: "media-entertainment",
        tags: ["TV Shows", "Episodes", "Cast", "Television"],
        icon: "fas fa-tv",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 18,
        name: "PokéAPI",
        folder: "19 PokéAPI",
        description: "Explore the world of Pokémon with detailed creature information.",
        category: "media-entertainment",
        tags: ["Pokemon", "Games", "Characters", "Nintendo"],
        icon: "fas fa-gamepad",
        image: "https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 19,
        name: "JSONPlaceholder",
        folder: "20 JSONPlaceholder",
        description: "Test API with fake JSON data for development and prototyping.",
        category: "development-tools",
        tags: ["Testing", "JSON", "Development", "Placeholder"],
        icon: "fas fa-code",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 20,
        name: "Reqres Testing",
        folder: "21 Reqres.in",
        description: "API testing service with realistic user data responses.",
        category: "development-tools",
        tags: ["Testing", "API", "Development", "Mock Data"],
        icon: "fas fa-vial",
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 21,
        name: "OpenCV Vision",
        folder: "22 OpenCV",
        description: "Computer vision and image processing demonstrations.",
        category: "ai-ml",
        tags: ["Computer Vision", "OpenCV", "Image Processing", "AI"],
        icon: "fas fa-eye",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 22,
        name: "Detectron2",
        folder: "23 Detectron2",
        description: "Object detection and instance segmentation using Detectron2.",
        category: "ai-ml",
        tags: ["Object Detection", "AI", "Machine Learning", "Computer Vision"],
        icon: "fas fa-search-plus",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 23,
        name: "spaCy NLP",
        folder: "24 spaCy",
        description: "Natural language processing and text analysis with spaCy.",
        category: "ai-ml",
        tags: ["NLP", "Text Analysis", "Language Processing", "AI"],
        icon: "fas fa-language",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 24,
        name: "NLTK Toolkit",
        folder: "25 NLTK",
        description: "Natural Language Toolkit for text processing and analysis.",
        category: "ai-ml",
        tags: ["NLTK", "Text Processing", "Natural Language", "Python"],
        icon: "fas fa-spell-check",
        image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 25,
        name: "Whisper Speech",
        folder: "26 Whisper",
        description: "Automatic speech recognition using OpenAI's Whisper model.",
        category: "ai-ml",
        tags: ["Speech Recognition", "Whisper", "Audio", "AI"],
        icon: "fas fa-microphone",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 26,
        name: "Vosk Recognition",
        folder: "27 Vosk",
        description: "Offline speech recognition with the Vosk toolkit.",
        category: "ai-ml",
        tags: ["Speech Recognition", "Vosk", "Offline", "Audio"],
        icon: "fas fa-volume-up",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 27,
        name: "Kaldi ASR",
        folder: "28 Kaldi",
        description: "Advanced speech recognition using the Kaldi toolkit.",
        category: "ai-ml",
        tags: ["Speech Recognition", "Kaldi", "ASR", "Audio Processing"],
        icon: "fas fa-waveform-lines",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 28,
        name: "Jikan Anime",
        folder: "29 Jikan",
        description: "Explore anime and manga database with detailed information.",
        category: "media-entertainment",
        tags: ["Anime", "Manga", "MyAnimeList", "Japanese Culture"],
        icon: "fas fa-mask",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 29,
        name: "World Air Quality Index (WAQI) API",
        folder: "30 World Air Quality Index (WAQI) API",
        description: "Monitor real-time air quality data and pollution levels worldwide.",
        category: "geography-weather",
        tags: ["Air Quality", "Environment", "Pollution", "Health"],
        icon: "fas fa-leaf",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 30,
        name: "Mistral 7B",
        folder: "31 Mistral 7B",
        description: "Mistral 7B language model integration and examples.",
        category: "ai-ml",
        tags: ["LLM", "Mistral", "AI", "Language Model"],
        icon: "fas fa-robot",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 31,
        name: "Unsplash Photos",
        folder: "32 Unsplash APIs",
        description: "Beautiful high-quality photos from the Unsplash community.",
        category: "social-web",
        tags: ["Photos", "Images", "Photography", "Unsplash"],
        icon: "fas fa-camera",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 32,
        name: "Datamuse Words",
        folder: "33 Datamuse API",
        description: "Word-finding query engine for developers and word game enthusiasts.",
        category: "data-apis",
        tags: ["Words", "Dictionary", "Language", "Text"],
        icon: "fas fa-font",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 33,
        name: "Giphy GIFs",
        folder: "34 Giphy API",
        description: "Search and discover animated GIFs from Giphy's vast collection.",
        category: "social-web",
        tags: ["GIFs", "Animation", "Entertainment", "Giphy"],
        icon: "fas fa-images",
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 34,
        name: "GoDaddy Domains",
        folder: "35 GoDaddy API",
        description: "Domain search and management tools using GoDaddy's API.",
        category: "development-tools",
        tags: ["Domains", "DNS", "Web Services", "GoDaddy"],
        icon: "fas fa-globe",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 35,
        name: "Google AI Studio",
        folder: "36 Google AI Studio",
        description: "Google's AI and machine learning model demonstrations.",
        category: "ai-ml",
        tags: ["Google AI", "Machine Learning", "AI Studio", "Google"],
        icon: "fab fa-google",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 36,
        name: "OpenML Platform",
        folder: "37 OpenML",
        description: "Open machine learning platform for sharing datasets and experiments.",
        category: "science-research",
        tags: ["Machine Learning", "Datasets", "Research", "Open Source"],
        icon: "fas fa-database",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 37,
        name: "iNaturalist",
        folder: "38  iNaturalist API",
        description: "Explore biodiversity and nature observations from around the world.",
        category: "science-research",
        tags: ["Nature", "Biodiversity", "Citizen Science", "Biology"],
        icon: "fas fa-leaf",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 38,
        name: "RAWG Games",
        folder: "39 RAWG Video Games Database API",
        description: "Comprehensive video game database with detailed game information.",
        category: "media-entertainment",
        tags: ["Video Games", "Gaming", "Database", "Entertainment"],
        icon: "fas fa-gamepad",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 39,
        name: "NewsAPI",
        folder: "40 NewsAPI.org",
        description: "Get breaking news headlines and articles from various sources.",
        category: "data-apis",
        tags: ["News", "Headlines", "Articles", "Media"],
        icon: "fas fa-newspaper",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backToTop = document.getElementById('backToTop');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');
const loadingOverlay = document.getElementById('loadingOverlay');

// Filter elements (create if they don't exist)
let categoryFilter = document.getElementById('categoryFilter');
let searchInput = document.getElementById('searchInput');
let sortFilter = document.getElementById('sortFilter');

// State
let filteredProjects = [...projects];
let displayedProjects = 0;
const projectsPerPage = 9; // Changed to 9 for 3x3 grid

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    displayProjects();
    setupScrollEffects();
    setupNavigation();
    setupCategoryCards();
    initializeEmailJS();
    
    // Initialize advanced animations
    setTimeout(() => {
        advancedAnimations = new AdvancedAnimations();
        advancedAnimations.createFloatingElements();
        advancedAnimations.create3DBackground();
        advancedAnimations.createParticleSystem();
    }, 100);
}

function setupEventListeners() {
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreProjects);
    
    // Back to top button
    backToTop.addEventListener('click', scrollToTop);
    
    // Navigation toggle
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Filter controls
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', handleSort);
    }
    
    // Real-time form validation
    setupFormValidation();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupFormValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Name field validation
    nameField?.addEventListener('blur', function() {
        if (this.value.trim().length >= 2) {
            markFieldValid('name');
        } else if (this.value.trim().length > 0) {
            markFieldInvalid('name');
        }
    });
    
    // Email field validation
    emailField?.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value.trim())) {
            markFieldValid('email');
        } else if (this.value.trim().length > 0) {
            markFieldInvalid('email');
        }
    });
    
    // Subject field validation
    subjectField?.addEventListener('change', function() {
        if (this.value) {
            markFieldValid('subject');
        }
    });
    
    // Message field validation
    messageField?.addEventListener('blur', function() {
        if (this.value.trim().length >= 10) {
            markFieldValid('message');
        } else if (this.value.trim().length > 0) {
            markFieldInvalid('message');
        }
    });
    
    // Clear validation on focus
    [nameField, emailField, subjectField, messageField].forEach(field => {
        field?.addEventListener('focus', function() {
            this.classList.remove('invalid');
            const formStatus = document.getElementById('formStatus');
            if (formStatus) {
                formStatus.style.display = 'none';
            }
        });
    });
}



function displayProjects() {
    const projectsToShow = filteredProjects.slice(0, displayedProjects + projectsPerPage);
    
    if (displayedProjects === 0) {
        projectsGrid.innerHTML = '';
    }
    
    const newProjects = filteredProjects.slice(displayedProjects, displayedProjects + projectsPerPage);
    
    newProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectsGrid.appendChild(projectCard);
    });
    
    displayedProjects += newProjects.length;
    
    // Show/hide load more button
    if (displayedProjects >= filteredProjects.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Show no results message
    if (filteredProjects.length === 0) {
        showNoResults();
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-fade-in-up';
    
    // Determine if we should use image or icon
    const thumbnailContent = project.image 
        ? `<img src="${project.image}" alt="${project.name}" class="project-image" loading="lazy">`
        : `<i class="${project.icon}"></i>`;
    
    card.innerHTML = `
        <div class="project-thumbnail ${project.category} ${project.image ? 'has-image' : 'has-icon'}">
            ${thumbnailContent}
            <div class="project-overlay">
                <div class="project-overlay-content">
                    <i class="${project.icon}" class="overlay-icon"></i>
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-actions">
                <a href="${project.folder}/index.html" class="btn btn-primary btn-small" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    View Project
                </a>
                <button class="btn btn-outline btn-small" onclick="shareProject('${project.name}', '${project.folder}')">
                    <i class="fas fa-share"></i>
                    Share
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function showNoResults() {
    projectsGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
            <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 1rem;">No projects found</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button class="btn btn-primary" onclick="clearAllFilters()">
                <i class="fas fa-refresh"></i>
                Clear Filters
            </button>
        </div>
    `;
}

function handleCategoryFilter() {
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    
    if (selectedCategory === '') {
        filteredProjects = [...projects];
    } else {
        filteredProjects = projects.filter(project => project.category === selectedCategory);
    }
    
    displayedProjects = 0;
    displayProjects();
    updateClearButton();
}

function handleSearch() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    
    filteredProjects = projects.filter(project => {
        const matchesSearch = searchTerm === '' || 
            project.name.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = selectedCategory === '' || project.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayedProjects = 0;
    displayProjects();
    updateClearButton();
}

function handleSort() {
    const sortBy = sortFilter ? sortFilter.value : 'name';
    
    filteredProjects.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });
    
    displayedProjects = 0;
    displayProjects();
}

function updateClearButton() {
    // This function can be implemented if you have a clear button
    // For now, it's just a placeholder
}

function clearAllFilters() {
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (sortFilter) sortFilter.value = 'name';
    filteredProjects = [...projects];
    displayedProjects = 0;
    displayProjects();
    updateClearButton();
}

function loadMoreProjects() {
    displayProjects();
}

function shareProject(name, folder) {
    if (navigator.share) {
        navigator.share({
            title: name,
            text: `Check out this amazing project: ${name}`,
            url: `${window.location.origin}/${folder}/index.html`
        });
    } else {
        // Fallback to clipboard
        const url = `${window.location.origin}/${folder}/index.html`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Project link copied to clipboard!');
        });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set background color based on type
    let backgroundColor;
    let icon;
    switch (type) {
        case 'error':
            backgroundColor = 'var(--error-color)';
            icon = 'fas fa-exclamation-triangle';
            break;
        case 'warning':
            backgroundColor = 'var(--warning-color)';
            icon = 'fas fa-exclamation-circle';
            break;
        case 'success':
        default:
            backgroundColor = 'var(--success-color)';
            icon = 'fas fa-check-circle';
            break;
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            line-height: 1;
        ">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds (longer for error messages)
    const timeout = type === 'error' ? 7000 : 5000;
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, timeout);
}

function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Navbar background
        if (scrolled > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
        
        // Back to top button
        if (scrolled > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Advanced Animation System
class AdvancedAnimations {
    constructor() {
        this.observerOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
            rootMargin: '-50px 0px -50px 0px'
        };
        this.observer = null;
        this.parallaxElements = [];
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxElements();
        this.setupScrollTriggers();
        this.setupStaggeredAnimations();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, this.observerOptions);

        // Observe all animatable elements
        this.observeElements();
    }

    observeElements() {
        const selectors = [
            '.section-title',
            '.section-subtitle', 
            '.category-card',
            '.project-card',
            '.feature-item',
            '.stat-card',
            '.contact-method',
            '.hero-title',
            '.hero-subtitle',
            '.hero-buttons',
            '.hero-stats'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('scroll-element');
                this.observer.observe(element);
            });
        });
    }

    triggerAnimation(element, ratio) {
        if (ratio > 0.2) {
            const animationType = this.getAnimationType(element);
            element.classList.add('animate', animationType);
            
            // Add staggered animation for grid items
            if (element.classList.contains('category-card') || element.classList.contains('project-card')) {
                this.addStaggeredDelay(element);
            }
        }
    }

    getAnimationType(element) {
        if (element.classList.contains('section-title')) return 'animate-text-reveal';
        if (element.classList.contains('section-subtitle')) return 'animate-fade-in-up';
        if (element.classList.contains('category-card')) return 'animate-scale-in';
        if (element.classList.contains('project-card')) return 'animate-slide-rotate';
        if (element.classList.contains('feature-item')) return 'animate-fade-in-left';
        if (element.classList.contains('stat-card')) return 'animate-bounce-in';
        if (element.classList.contains('contact-method')) return 'animate-fade-in-right';
        if (element.classList.contains('hero-title')) return 'animate-zoom-blur';
        if (element.classList.contains('hero-subtitle')) return 'animate-fade-in-up';
        if (element.classList.contains('hero-buttons')) return 'animate-fade-in-up';
        if (element.classList.contains('hero-stats')) return 'animate-flip-in';
        
        return 'animate-fade-in-up';
    }

    addStaggeredDelay(element) {
        const siblings = Array.from(element.parentElement.children);
        const index = siblings.indexOf(element);
        const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
        element.classList.add(staggerClass);
    }

    setupParallaxElements() {
        this.parallaxElements = document.querySelectorAll('.hero-background, .hero-particles');
        
        this.parallaxElements.forEach(element => {
            element.classList.add('parallax-element');
        });
    }

    setupScrollTriggers() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effects
        this.parallaxElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Navbar effects
        this.updateNavbar(scrolled);
        
        // Progress indicator
        this.updateProgressIndicator();
        
        // Section-based animations
        this.triggerSectionAnimations(scrolled);
    }

    updateNavbar(scrolled) {
        const navbar = document.getElementById('navbar');
        if (scrolled > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }

    updateProgressIndicator() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.getElementById('scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 3px;
                background: var(--gradient-primary);
                z-index: 9999;
                transition: width 0.1s ease-out;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = scrolled + '%';
        }
    }

    triggerSectionAnimations(scrolled) {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                section.classList.add('section-visible');
                this.animateSectionContent(section);
            }
        });
    }

    animateSectionContent(section) {
        if (section.classList.contains('animated')) return;
        
        const elements = section.querySelectorAll('h2, h3, p, .btn, img, .card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.filter = 'blur(0px)';
            }, index * 100);
        });
        
        section.classList.add('animated');
    }

    setupStaggeredAnimations() {
        const grids = document.querySelectorAll('.categories-grid, .projects-grid');
        
        grids.forEach(grid => {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    // Method to manually trigger animations
    triggerCustomAnimation(element, animationType, delay = 0) {
        setTimeout(() => {
            element.classList.add(animationType);
        }, delay);
    }

    // Method to create floating elements
    createFloatingElements() {
        const container = document.querySelector('.hero');
        const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b'];
        
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                pointer-events: none;
            `;
            container.appendChild(element);
        }
    }

    // Method to create 3D background
    create3DBackground() {
        const background3D = document.createElement('div');
        background3D.className = 'background-3d';
        
        // Create wave animation layer
        const waveLayer = document.createElement('div');
        waveLayer.className = 'wave-animation';
        background3D.appendChild(waveLayer);
        
        // Create mesh grid
        const meshGrid = document.createElement('div');
        meshGrid.className = 'mesh-grid';
        background3D.appendChild(meshGrid);
        
        // Create floating cubes
        for (let i = 0; i < 8; i++) {
            const cube = document.createElement('div');
            cube.className = 'floating-cube';
            cube.style.left = Math.random() * 100 + '%';
            cube.style.animationDelay = Math.random() * 20 + 's';
            cube.style.animationDuration = (Math.random() * 10 + 15) + 's';
            background3D.appendChild(cube);
        }
        
        // Create geometric shapes
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            shape.className = 'geometric-shape';
            const size = Math.random() * 80 + 40;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 15 + 's';
            background3D.appendChild(shape);
        }
        
        // Create spiral elements
        for (let i = 0; i < 15; i++) {
            const spiral = document.createElement('div');
            spiral.className = 'spiral-element';
            spiral.style.left = Math.random() * 100 + '%';
            spiral.style.animationDelay = Math.random() * 12 + 's';
            
            // Random colors for spiral elements
            const colors = [
                'rgba(99, 102, 241, 0.6)',
                'rgba(139, 92, 246, 0.6)',
                'rgba(6, 182, 212, 0.6)',
                'rgba(245, 158, 11, 0.6)'
            ];
            spiral.style.background = colors[Math.floor(Math.random() * colors.length)];
            background3D.appendChild(spiral);
        }
        
        // Create 3D orbs
        for (let i = 0; i < 4; i++) {
            const orb = document.createElement('div');
            orb.className = 'orb-3d';
            const size = Math.random() * 120 + 60;
            orb.style.width = size + 'px';
            orb.style.height = size + 'px';
            orb.style.left = Math.random() * 100 + '%';
            orb.style.top = Math.random() * 100 + '%';
            orb.style.animationDelay = Math.random() * 25 + 's';
            orb.style.animationDuration = (Math.random() * 10 + 20) + 's';
            background3D.appendChild(orb);
        }
        
        document.body.appendChild(background3D);
        
        // Add mouse interaction
        this.add3DMouseInteraction(background3D);
    }

    // Add mouse interaction to 3D elements
    add3DMouseInteraction(container) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            
            // Apply subtle 3D rotation based on mouse position
            const cubes = container.querySelectorAll('.floating-cube');
            const orbs = container.querySelectorAll('.orb-3d');
            
            cubes.forEach((cube, index) => {
                const intensity = (index + 1) * 0.1;
                cube.style.transform += ` rotateY(${mouseX * intensity * 10}deg) rotateX(${mouseY * intensity * 10}deg)`;
            });
            
            orbs.forEach((orb, index) => {
                const intensity = (index + 1) * 0.05;
                orb.style.transform += ` translateX(${mouseX * intensity * 20}px) translateY(${mouseY * intensity * 20}px)`;
            });
        });
    }

    // Create particle system
    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -5;
        `;
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const colors = [
                'rgba(99, 102, 241, 0.4)',
                'rgba(139, 92, 246, 0.4)',
                'rgba(6, 182, 212, 0.4)',
                'rgba(245, 158, 11, 0.4)'
            ];
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 15}s;
                animation-duration: ${Math.random() * 10 + 10}s;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }
}

// Initialize advanced animations
let advancedAnimations;

function animateOnScroll() {
    // This function is now handled by the AdvancedAnimations class
    if (!advancedAnimations) {
        advancedAnimations = new AdvancedAnimations();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function setupNavigation() {
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            categoryFilter.value = category;
            handleCategoryFilter();
            
            // Scroll to projects section
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Footer category links
    const footerCategoryLinks = document.querySelectorAll('[data-category]');
    footerCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            categoryFilter.value = category;
            handleCategoryFilter();
            
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize EmailJS
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined' && typeof EMAIL_CONFIG !== 'undefined') {
        emailjs.init(EMAIL_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS or configuration not loaded. Please check emailjs-config.js file.');
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Clear previous validation states
    clearFormValidation();
    
    // Show loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    formStatus.style.display = 'none';
    
    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
        from_name: formData.get('name')?.trim(),
        from_email: formData.get('email')?.trim(),
        subject: formData.get('subject'),
        message: formData.get('message')?.trim(),
        to_email: 'ileshpatel666@gmail.com',
        reply_to: formData.get('email')?.trim(),
        timestamp: new Date().toLocaleString(),
        user_agent: navigator.userAgent,
        page_url: window.location.href
    };
    
    // Validate form data
    const validationErrors = validateContactForm(templateParams);
    if (validationErrors.length > 0) {
        showFormStatus(validationErrors.join(' '), 'error');
        resetSubmitButton(submitBtn, originalText);
        return;
    }
    
    // Check EmailJS availability
    if (typeof emailjs === 'undefined') {
        showFormStatus('Email service is not available. Please try again later.', 'error');
        resetSubmitButton(submitBtn, originalText);
        return;
    }
    
    if (typeof EMAIL_CONFIG === 'undefined' || !EMAIL_CONFIG.publicKey || !EMAIL_CONFIG.serviceID || !EMAIL_CONFIG.templateID) {
        showFormStatus('Email service is not properly configured. Please contact the administrator.', 'warning');
        resetSubmitButton(submitBtn, originalText);
        return;
    }
    
    // Send email using EmailJS
    emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, templateParams)
        .then((response) => {
            console.log('Email sent successfully:', response);
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            showFormStatus('Your message has been sent successfully! We\'ll respond within 24 hours.', 'success');
            contactForm.reset();
            resetSubmitButton(submitBtn, originalText);
            
            // Track successful submission (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: templateParams.subject
                });
            }
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            let errorMessage = 'Failed to send message. Please try again.';
            
            // Provide more specific error messages
            if (error.status === 400) {
                errorMessage = 'Invalid form data. Please check all fields and try again.';
            } else if (error.status === 401) {
                errorMessage = 'Email service authentication failed. Please contact support.';
            } else if (error.status === 404) {
                errorMessage = 'Email service not found. Please contact support.';
            } else if (error.status >= 500) {
                errorMessage = 'Server error. Please try again in a few minutes.';
            }
            
            showNotification(errorMessage, 'error');
            showFormStatus(errorMessage + ' You can also contact us directly at ileshpatel666@gmail.com', 'error');
            resetSubmitButton(submitBtn, originalText);
        });
}

function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.from_name || data.from_name.length < 2) {
        errors.push('Please enter a valid name (at least 2 characters).');
        markFieldInvalid('name');
    } else {
        markFieldValid('name');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.from_email || !emailRegex.test(data.from_email)) {
        errors.push('Please enter a valid email address.');
        markFieldInvalid('email');
    } else {
        markFieldValid('email');
    }
    
    // Subject validation
    if (!data.subject) {
        errors.push('Please select a subject.');
        markFieldInvalid('subject');
    } else {
        markFieldValid('subject');
    }
    
    // Message validation
    if (!data.message || data.message.length < 10) {
        errors.push('Please enter a message (at least 10 characters).');
        markFieldInvalid('message');
    } else {
        markFieldValid('message');
    }
    
    return errors;
}

function markFieldInvalid(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
}

function markFieldValid(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('valid');
        field.classList.remove('invalid');
    }
}

function clearFormValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.remove('valid', 'invalid');
        }
    });
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
    }
}

function resetSubmitButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        clearSearchInput();
        searchInput.blur();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification.removing {
        animation: slideOutRight 0.3s ease-in forwards;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--dark-surface);
        border-top: 1px solid var(--border-color);
        padding: 1rem;
        gap: 1rem;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-toggle {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);
