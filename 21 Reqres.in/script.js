document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const userGrid = document.getElementById('user-grid');
    const loader = document.getElementById('loader');
    const pagination = document.getElementById('pagination');
    const modal = document.getElementById('user-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginFeedback = document.getElementById('login-feedback');
    const registerFeedback = document.getElementById('register-feedback');

    // Delayed Response
    const fetchDelayedBtn = document.getElementById('fetch-delayed-btn');
    const delayedLoader = document.getElementById('delayed-loader');
    const delayedResponseEl = document.getElementById('delayed-response');

    const API_BASE_URL = 'https://reqres.in/api';
    let currentPage = 1;

    // --- API Headers with Key ---
    const API_HEADERS = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'reqres-free-v1' // Your API key
    };

    // --- API Functions ---

    /**
     * Fetches a list of users for a given page.
     * @param {number} page - The page number to fetch.
     */
    const fetchUsers = async (page) => {
        showLoader(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users?page=${page}`, {
                headers: API_HEADERS
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            renderUsers(data.data);
            renderPagination(data.page, data.total_pages);
        } catch (error) {
            userGrid.innerHTML = `<p class="error">Failed to fetch users. Please try again later.</p>`;
            console.error('Fetch users error:', error);
        } finally {
            showLoader(false);
        }
    };

    /**
     * Fetches data for a single user by ID.
     * @param {number} userId - The ID of the user to fetch.
     */
    const fetchSingleUser = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                headers: API_HEADERS
            });
            if (!response.ok) throw new Error('Failed to fetch user data.');
            const { data } = await response.json();
            showUserModal(data);
        } catch (error) {
            console.error('Fetch single user error:', error);
        }
    };

    // --- Rendering Functions ---

    /**
     * Renders user cards into the grid.
     * @param {Array} users - An array of user objects.
     */
    const renderUsers = (users) => {
        userGrid.innerHTML = ''; // Clear previous users
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.dataset.userId = user.id;
            userCard.innerHTML = `
                <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
                <h3>${user.first_name} ${user.last_name}</h3>
                <p>${user.email}</p>
            `;
            userGrid.appendChild(userCard);
        });
    };

    /**
     * Renders pagination buttons.
     * @param {number} currentPage - The current active page.
     * @param {number} totalPages - The total number of pages.
     */
    const renderPagination = (currentPage, totalPages) => {
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'btn btn-secondary';
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.disabled = true;
                pageBtn.classList.add('btn-primary');
            }
            pageBtn.addEventListener('click', () => {
                fetchUsers(i);
            });
            pagination.appendChild(pageBtn);
        }
    };

    /**
     * Displays a modal with single user details.
     * @param {object} user - The user object.
     */
    const showUserModal = (user) => {
        modalBody.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name}">
            <h2>${user.first_name} ${user.last_name}</h2>
            <p>Email: ${user.email}</p>
            <p>User ID: ${user.id}</p>
        `;
        modal.classList.add('active');
    };

    // --- Authentication ---

    const handleAuth = async (event, endpoint, feedbackEl) => {
        event.preventDefault();
        const form = event.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
        
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: API_HEADERS, // Using the new headers object
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                feedbackEl.textContent = `Success! Token: ${data.token || `ID: ${data.id}`}`;
                feedbackEl.classList.add('success');
            } else {
                throw new Error(data.error || 'Something went wrong.');
            }
        } catch (error) {
            feedbackEl.textContent = `Error: ${error.message}`;
            feedbackEl.classList.add('error');
            form.classList.add('error-shake');
            setTimeout(() => form.classList.remove('error-shake'), 500);
        }
    };

    // --- Delayed Response ---
    const fetchDelayedData = async () => {
        delayedLoader.style.display = 'block';
        delayedResponseEl.textContent = '';
        try {
            const response = await fetch(`${API_BASE_URL}/users?delay=3`, {
                headers: API_HEADERS
            });
            const data = await response.json();
            delayedResponseEl.textContent = JSON.stringify(data, null, 2);
        } catch(error) {
            delayedResponseEl.textContent = `Error fetching data: ${error.message}`;
        } finally {
            delayedLoader.style.display = 'none';
        }
    };


    // --- Helper Functions ---
    const showLoader = (isLoading) => {
        loader.style.display = isLoading ? 'flex' : 'none';
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };
    
    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    // --- Event Listeners ---
    userGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.user-card');
        if (card) {
            const userId = card.dataset.userId;
            fetchSingleUser(userId);
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    loginForm.addEventListener('submit', (e) => handleAuth(e, 'login', loginFeedback));
    registerForm.addEventListener('submit', (e) => handleAuth(e, 'register', registerFeedback));
    
    fetchDelayedBtn.addEventListener('click', fetchDelayedData);

    // --- Initial Load ---
    fetchUsers(currentPage);
});