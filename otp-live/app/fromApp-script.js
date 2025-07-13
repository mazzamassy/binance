document.addEventListener('DOMContentLoaded', function() {
    const resendButton = document.querySelector('.resend-button');
    
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            // Simulate resending notification
            const originalText = this.textContent;
            this.textContent = 'Invio in corso...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Inviato!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1500);
            }, 1000);
        });
    }
});