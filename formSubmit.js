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

    // Create an object with form data
    const formData = Object.fromEntries(new FormData(form));

    fetch(form.action, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      console.log('Response:', response);
      if (response.ok) {
        setButtonState('checkmark');
        form.reset();
        console.log('Form submitted successfully');
        alert('Thank you for your submission! Someone from our team will reach out to you soon for the next steps.');
      } else {
        throw new Error('Form submission failed');
      }
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