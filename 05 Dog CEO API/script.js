// ===== API ENDPOINTS =====
const API_BASE = 'https://dog.ceo/api';
const ENDPOINTS = {
    randomDog: `${API_BASE}/breeds/image/random`,
    allBreeds: `${API_BASE}/breeds/list/all`,
    breedImages: (breed) => `${API_BASE}/breed/${breed}/images/random`,
    multipleRandom: (count) => `${API_BASE}/breeds/image/random/${count}`
};

// ===== GLOBAL STATE =====
let allBreeds = {};

// ===== DOM ELEMENTS =====
const elements = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Hero section
    randomDogBtn: document.getElementById('random-dog-btn'),
    
    // Breed section
    breedSelector: document.getElementById('breed-selector'),
    fetchBreedBtn: document.getElementById('fetch-breed-btn'),
    surpriseBtn: document.getElementById('surprise-btn'),
    
    // Gallery
    singleImageContainer: document.getElementById('single-image-container'),
    dogImage: document.getElementById('dog-image'),
    galleryGrid: document.getElementById('gallery-grid'),
    
    // Image actions
    downloadBtn: document.getElementById('download-btn'),
    shareBtn: document.getElementById('share-btn'),
    
    // Loading and errors
    loadingSpinner: document.getElementById('loading-spinner'),
    errorModal: document.getElementById('error-modal'),
    errorMessage: document.getElementById('error-message'),
    closeErrorBtn: document.getElementById('close-error-btn'),
    
    // Footer
    footer: document.querySelector('.footer')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    await initializeBreeds();
    initializeEventListeners();
    initializeIntersectionObserver();
    initializeScrollAnimations();
    
    // Show navbar after brief delay
    setTimeout(() => {
        elements.navbar.classList.add('visible');
    }, 1000);
});



// ===== API FUNCTIONS =====
async function fetchFromAPI(url, options = {}) {
    try {
        showLoading();
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'success') {
            throw new Error(data.message || 'API request failed');
        }
        
        hideLoading();
        return data;
    } catch (error) {
        hideLoading();
        console.error('API Error:', error);
        showError(`Failed to fetch data: ${error.message}`);
        throw error;
    }
}

async function fetchRandomDog() {
    try {
        const data = await fetchFromAPI(ENDPOINTS.randomDog);
        return data.message;
    } catch (error) {
        showError('Could not fetch a random dog image. Please try again.');
        return null;
    }
}

async function fetchBreedImage(breed) {
    try {
        const data = await fetchFromAPI(ENDPOINTS.breedImages(breed));
        return data.message;
    } catch (error) {
        showError(`Could not fetch image for ${breed}. Please try again.`);
        return null;
    }
}

async function fetchMultipleRandomDogs(count = 6) {
    try {
        const data = await fetchFromAPI(ENDPOINTS.multipleRandom(count));
        return data.message;
    } catch (error) {
        showError('Could not fetch multiple dog images. Please try again.');
        return [];
    }
}

async function initializeBreeds() {
    try {
        const data = await fetchFromAPI(ENDPOINTS.allBreeds);
        allBreeds = data.message;
        populateBreedSelector();
    } catch (error) {
        showError('Could not load dog breeds. Some features may be limited.');
        elements.breedSelector.innerHTML = '<option value="">Failed to load breeds</option>';
    }
}

// ===== UI FUNCTIONS =====
function populateBreedSelector() {
    const breedOptions = ['<option value="">Select a breed...</option>'];
    
    Object.keys(allBreeds).forEach(breed => {
        const subBreeds = allBreeds[breed];
        
        if (subBreeds.length === 0) {
            breedOptions.push(`<option value="${breed}">${capitalizeWord(breed)}</option>`);
        } else {
            subBreeds.forEach(subBreed => {
                const value = `${breed}/${subBreed}`;
                const label = `${capitalizeWord(breed)} - ${capitalizeWord(subBreed)}`;
                breedOptions.push(`<option value="${value}">${label}</option>`);
            });
        }
    });
    
    elements.breedSelector.innerHTML = breedOptions.join('');
    elements.fetchBreedBtn.disabled = false;
}

function displaySingleImage(imageUrl, breed = '') {
    elements.dogImage.src = imageUrl;
    elements.dogImage.alt = breed ? `${capitalizeWord(breed)} dog` : 'Random dog';
    
    // Store current image for actions
    elements.dogImage.dataset.url = imageUrl;
    elements.dogImage.dataset.breed = breed;
    
    // Show container with animation
    elements.galleryGrid.classList.add('hidden');
    elements.singleImageContainer.classList.remove('hidden');
    
    setTimeout(() => {
        elements.singleImageContainer.classList.add('visible');
    }, 100);
}

function displayGallery(imageUrls) {
    elements.singleImageContainer.classList.add('hidden');
    elements.galleryGrid.innerHTML = '';
    
    imageUrls.forEach((url, index) => {
        const galleryItem = createGalleryItem(url, index);
        elements.galleryGrid.appendChild(galleryItem);
    });
    
    elements.galleryGrid.classList.remove('hidden');
    setTimeout(() => {
        elements.galleryGrid.classList.add('visible');
        animateGalleryItems();
    }, 100);
}

function createGalleryItem(imageUrl, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.innerHTML = `
        <img src="${imageUrl}" alt="Random dog" loading="lazy">
        <div class="image-actions">
            <button class="action-btn download-gallery" data-url="${imageUrl}">
                <span>📥 Download</span>
            </button>
            <button class="action-btn share-gallery" data-url="${imageUrl}">
                <span>🔗 Share</span>
            </button>
        </div>
    `;
    
    // Add event listeners to gallery action buttons
    item.querySelector('.download-gallery').addEventListener('click', () => downloadImage(imageUrl));
    item.querySelector('.share-gallery').addEventListener('click', () => shareImage(imageUrl));
    
    return item;
}

function animateGalleryItems() {
    const items = elements.galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}



// ===== IMAGE ACTIONS =====
async function downloadImage(imageUrl) {
    try {
        showLoading();
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `doggo-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(link.href);
        hideLoading();
        showSuccessToast('Image downloaded! 📥');
    } catch (error) {
        hideLoading();
        showError('Failed to download image. Please try again.');
    }
}

async function shareImage(imageUrl) {
    const shareData = {
        title: 'Check out this adorable dog!',
        text: 'I found this amazing dog photo on Doggo Finder! 🐶',
        url: imageUrl
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showSuccessToast('Shared successfully! 🔗');
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(imageUrl);
            showSuccessToast('Image URL copied to clipboard! 🔗');
        }
    } catch (error) {
        // Ultimate fallback: show URL in modal
        showError(`Share URL: ${imageUrl}`);
    }
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Hero random dog button
    elements.randomDogBtn.addEventListener('click', async () => {
        const imageUrl = await fetchRandomDog();
        if (imageUrl) {
            displaySingleImage(imageUrl);
            scrollToSection('gallery');
        }
    });
    
    // Breed selector
    elements.breedSelector.addEventListener('change', (e) => {
        elements.fetchBreedBtn.disabled = !e.target.value;
    });
    
    // Fetch breed button
    elements.fetchBreedBtn.addEventListener('click', async () => {
        const selectedBreed = elements.breedSelector.value;
        if (!selectedBreed) return;
        
        const imageUrl = await fetchBreedImage(selectedBreed);
        if (imageUrl) {
            displaySingleImage(imageUrl, selectedBreed);
            scrollToSection('gallery');
        }
    });
    
    // Surprise button (multiple random)
    elements.surpriseBtn.addEventListener('click', async () => {
        const imageUrls = await fetchMultipleRandomDogs(6);
        if (imageUrls.length > 0) {
            displayGallery(imageUrls);
            scrollToSection('gallery');
        }
    });
    
    // Single image actions
    elements.downloadBtn.addEventListener('click', () => {
        const imageUrl = elements.dogImage.dataset.url;
        if (imageUrl) downloadImage(imageUrl);
    });
    

    
    elements.shareBtn.addEventListener('click', () => {
        const imageUrl = elements.dogImage.dataset.url;
        if (imageUrl) shareImage(imageUrl);
    });
    
    // Error modal
    elements.closeErrorBtn.addEventListener('click', hideError);
    elements.errorModal.addEventListener('click', (e) => {
        if (e.target === elements.errorModal) hideError();
    });
    
    // Navigation smooth scrolling
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideError();
        }
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            elements.randomDogBtn.click();
        }
    });
}

// ===== ANIMATIONS & SCROLL EFFECTS =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for different elements
                if (entry.target.classList.contains('section-title')) {
                    entry.target.style.transitionDelay = '0.2s';
                }
                
                if (entry.target.classList.contains('feature-list')) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToObserve = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.breed-controls'),
        ...document.querySelectorAll('.about-content'),
        ...document.querySelectorAll('.feature-list'),
        elements.footer
    ];
    
    elementsToObserve.forEach(el => {
        if (el) observer.observe(el);
    });
}

function initializeScrollAnimations() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Navbar hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            elements.navbar.style.transform = 'translateY(-100%)';
        } else {
            elements.navbar.style.transform = 'translateY(0)';
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = scrolled * 0.5;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// ===== UTILITY FUNCTIONS =====
function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== LOADING & ERROR HANDLING =====
function showLoading() {
    elements.loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    elements.loadingSpinner.classList.add('hidden');
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorModal.classList.remove('hidden');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    elements.errorModal.classList.add('hidden');
}

function showSuccessToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #235347, #163832);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        font-size: 14px;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Service Worker for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    // Focus management for modals
    if (e.key === 'Tab' && !elements.errorModal.classList.contains('hidden')) {
        // Trap focus within modal
        const focusableElements = elements.errorModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// ===== ERROR BOUNDARY =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    showError('Something went wrong. Please refresh the page and try again.');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showError('A network error occurred. Please check your connection and try again.');
});

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchFromAPI,
        capitalizeWord,
        generateId
    };
}