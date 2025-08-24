// Mock API function
function mockSymptomChecker(age, gender, symptoms) {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = {
                conditions: [
                    { name: "Common Cold", probability: 0.7 },
                    { name: "Flu", probability: 0.5 },
                    { name: "Allergies", probability: 0.3 }
                ]
            };
            resolve(mockData);
        }, 1000); // Simulate 1-second delay
    });
}

async function checkSymptoms() {
    const ageInput = document.getElementById('age').value.trim();
    const age = parseInt(ageInput, 10);
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value.trim();
    const resultsSection = document.getElementById('results');

    // Clear previous results
    resultsSection.innerHTML = '';
    resultsSection.style.display = 'none';

    // Validate age
    if (!ageInput || isNaN(age) || age <= 0) {
        alert('Please enter a valid age greater than 0.');
        return;
    }

    // Validate symptoms
    if (!symptoms) {
        alert('Please enter symptoms.');
        return;
    }

    // Show loading message
    resultsSection.innerHTML = `<p>Loading...</p>`;
    resultsSection.style.display = 'block';

    try {
        // Call mock API
        const data = await mockSymptomChecker(age, gender, symptoms);

        // Display results
        resultsSection.innerHTML = `
            <h3>Results:</h3>
            <p><strong>Possible Conditions:</strong></p>
            <ul>
                ${data.conditions.map(condition => `
                    <li>${condition.name} (${Math.round(condition.probability * 100)}%)</li>
                `).join('')}
            </ul>
            <button onclick="openConsultation('Dr. Smith', 349)">Consult a Doctor</button>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsSection.innerHTML = `<p>Error: Unable to fetch results. Please try again later.</p>`;
    }
}

// Function to open the consultation modal
function openConsultation(doctorName, price) {
    document.getElementById("doctorName").innerText = doctorName;
    document.getElementById("consultationModal").style.display = "flex";
}

// Function to close the consultation modal
function closeConsultation() {
    document.getElementById("consultationModal").style.display = "none";
}

// Function to start consultation based on payment choice
function startConsultation(type) {
    if (type === "fixed") {
        alert("You have chosen the unlimited ₹349 plan.");
    } else {
        alert("You have chosen the ₹30/min plan (Minimum ₹300 required).");
    }
    closeConsultation();
}




document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});




const reviewsData = [
    { name: "John Doe", rating: 5, comment: "The symptom checker was 100% accurate! I had a great interaction with the doctor afterward." },
    { name: "Jane Smith", rating: 5, comment: "Amazing tool! It helped me identify my symptoms quickly and accurately." },
    { name: "Alice Johnson", rating: 4, comment: "Very useful and easy to use. The doctor consultation was seamless." }
  ];
  const reviewsContainer = document.querySelector('.reviews-container');
  const addReviewBtn = document.getElementById('add-review-btn');
  const modal = document.getElementById('review-form-modal');
  const closeBtn = document.querySelector('.close');
  const reviewForm = document.getElementById('review-form');
  function displayReviews() {
    reviewsContainer.innerHTML = '';
    reviewsData.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.classList.add('review-card');
      reviewCard.innerHTML = `
        <h3>${review.name}</h3>
        <div class="rating">${'★'.repeat(review.rating)}</div>
        <p>${review.comment}</p>
      `;
      reviewsContainer.appendChild(reviewCard);
    });
  }
  
  addReviewBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
  
    reviewsData.push({ name, rating, comment });
    displayReviews();
    modal.style.display = 'none';
    reviewForm.reset();
  });
  displayReviews();