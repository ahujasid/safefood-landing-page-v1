document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.join-form');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.querySelector('.submit-btn');
    const arrow = submitBtn.querySelector('.arrow');
    const spinner = submitBtn.querySelector('.btn-spinner');
    const checkmark = submitBtn.querySelector('.checkmark');
  
    function setButtonState(state) {
      arrow.style.display = state === 'arrow' ? 'inline' : 'none';
      spinner.style.display = state === 'spinner' ? 'inline' : 'none';
      checkmark.style.display = state === 'checkmark' ? 'inline' : 'none';
      submitBtn.disabled = state === 'spinner';
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const phoneNumber = phoneInput.value.trim();
      if (!/^\d{10}$/.test(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
      
      setButtonState('spinner');
  
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        console.log('Response status:', response.status);
        return response.text().then(text => {
          console.log('Response text:', text);
          if (response.ok) {
            setButtonState('checkmark');
            form.reset();
            console.log('Form submitted successfully');
            // Show success alert
            alert('Thank you for your submission! Someone from our team will reach out to you soon for the next steps.');
          } else {
            throw new Error('Form submission failed');
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
      })
      .finally(() => {
        setTimeout(() => {
          setButtonState('arrow');
        }, 2000);
      });
    });
  });