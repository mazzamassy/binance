document.addEventListener('DOMContentLoaded', function() {
    const resendButton = document.querySelector('.resend-button');
    let countdownInterval;
    let timeLeft = 0;
    
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            if (this.disabled) return; // Se il pulsante è già disabilitato, non fare nulla
            
            startCountdown();
        });
    }
    
    function startCountdown() {
        timeLeft = 30; // 30 secondi
        resendButton.disabled = true;
        resendButton.style.backgroundColor = '#474D57'; // Grigio
        resendButton.style.cursor = 'not-allowed';
        
        updateButtonText();
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            updateButtonText();
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                resetButton();
            }
        }, 1000);
    }
    
    function updateButtonText() {
        resendButton.textContent = `Invia di nuovo (${timeLeft}s)`;
    }
    
    function resetButton() {
        resendButton.disabled = false;
        resendButton.style.backgroundColor = '#FCD535'; // Giallo originale
        resendButton.style.cursor = 'pointer';
        resendButton.textContent = 'Invia di nuovo';
    }
});