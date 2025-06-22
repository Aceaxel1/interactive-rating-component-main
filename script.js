let selectedRating = 0;

// Add click event listeners to rating buttons
document.querySelectorAll('.rates').forEach(rate => {
  rate.addEventListener('click', function() {
    // Remove active class from all rates
    document.querySelectorAll('.rates').forEach(r => {
      r.classList.remove('bg-orange', 'text-white');
      r.classList.add('bg-light-grey', 'text-medium-grey');
    });
    
    // Add active class to clicked rate
    this.classList.remove('bg-light-grey', 'text-medium-grey');
    this.classList.add('bg-orange', 'text-white');
    
    selectedRating = this.getAttribute('data-rating');
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
    document.getElementById('rated-text').textContent = `You selected ${selectedRating} out of 5`;
  }
}); 