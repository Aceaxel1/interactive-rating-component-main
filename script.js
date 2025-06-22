let selectedRating = 0;

// Function to select a rating
function selectRating(element) {
  // Remove active class from all rates
  document.querySelectorAll('.rates').forEach(r => {
    r.classList.remove('bg-orange', 'text-white');
    r.classList.add('bg-light-grey', 'text-medium-grey');
    r.setAttribute('aria-pressed', 'false');
  });
  
  // Add active class to clicked rate
  element.classList.remove('bg-light-grey', 'text-medium-grey');
  element.classList.add('bg-orange', 'text-white');
  element.setAttribute('aria-pressed', 'true');
  
  selectedRating = element.getAttribute('data-rating');
  
  // Announce the selection to screen readers
  const announcement = `Rating ${selectedRating} selected`;
  announceToScreenReader(announcement);
}

// Function to announce changes to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove the announcement element after a short delay
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Add click event listeners to rating buttons
document.querySelectorAll('.rates').forEach(rate => {
  rate.addEventListener('click', function() {
    selectRating(this);
  });
});

// Add click event listener to submit button
document.getElementById('submit-btn').addEventListener('click', function() {
  if (selectedRating > 0) {
    // Hide rating state
    document.getElementById('rating').classList.add('hidden');
    
    // Show thank you state
    document.getElementById('thank-you').classList.remove('hidden');
    
    // Update the rating text
    const ratedText = document.getElementById('rated-text');
    ratedText.textContent = `You selected ${selectedRating} out of 5`;
    
    // Announce the state change to screen readers
    announceToScreenReader(`Thank you! You selected ${selectedRating} out of 5`);
    
    // Focus on the thank you heading for better accessibility
    document.getElementById('thank-you-heading').focus();
  } else {
    // Announce that a rating must be selected
    announceToScreenReader('Please select a rating before submitting');
  }
});

// Initialize accessibility attributes
document.addEventListener('DOMContentLoaded', function() {
  // Set initial aria-pressed states
  document.querySelectorAll('.rates').forEach(rate => {
    rate.setAttribute('aria-pressed', 'false');
  });
  
  // Add focus management
  const thankYouSection = document.getElementById('thank-you');
  
  // When thank you section becomes visible, focus the heading
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (!thankYouSection.classList.contains('hidden')) {
          document.getElementById('thank-you-heading').focus();
        }
      }
    });
  });
  
  observer.observe(thankYouSection, {
    attributes: true,
    attributeFilter: ['class']
  });
}); 