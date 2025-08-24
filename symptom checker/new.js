document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Symptom Checker API ---
    function mockSymptomCheckerAPI(age, gender, symptoms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockData = {
                    conditions: [
                        { name: "Common Cold", probability: 0.7 },
                        { name: "Influenza (Flu)", probability: 0.5 },
                        { name: "Allergies", probability: 0.3 },
                        { name: "Sinusitis", probability: 0.2 }
                    ]
                };
                resolve(mockData);
            }, 1000);
        });
    }
  
    // --- Symptom Checker Logic ---
    window.checkSymptoms = async function() {
        const ageInput = document.getElementById('age').value.trim();
        const gender = document.getElementById('gender').value;
        const symptoms = document.getElementById('symptoms-input').value.trim();
        const resultsSection = document.getElementById('results');
  
        if (!ageInput || !gender || !symptoms) {
            alert('Please fill out all fields.');
            return;
        }
  
        const age = parseInt(ageInput);
        if (isNaN(age) || age <= 0 || age > 120) {
            alert('Please enter a valid age (1–120).');
            return;
        }
  
        resultsSection.style.display = 'block';
        resultsSection.innerHTML = `<p>Analyzing your symptoms...</p>`;
  
        try {
            const data = await mockSymptomCheckerAPI(age, gender, symptoms);
            resultsSection.innerHTML = `
                <h3>Potential Conditions:</h3>
                <ul>
                    ${data.conditions.map(c => `<li>${c.name} (${Math.round(c.probability * 100)}% likelihood)</li>`).join('')}
                </ul>
                <p class="disclaimer" style="margin-top: 15px;">This is not a medical diagnosis. Please consult a doctor.</p>
            `;
        } catch (error) {
            resultsSection.innerHTML = `<p>An error occurred. Please try again later.</p>`;
            console.error('Symptom Checker Error:', error);
        }
    };
  
    // --- Consultation Modal ---
    const consultationModal = document.getElementById("consultationModal");
    window.openConsultation = function(doctorName, price) {
        document.getElementById("doctorName").innerText = `Consult with ${doctorName}`;
        consultationModal.style.display = "flex";
        setTimeout(() => consultationModal.classList.add("show"), 10);
    };
    window.closeConsultation = function() {
        consultationModal.classList.remove("show");
        setTimeout(() => consultationModal.style.display = "none", 300);
    };
    window.startConsultation = function(type) {
        alert(type === 'fixed' ? "Starting unlimited consultation plan." : "Starting pay-per-minute consultation.");
        closeConsultation();
    };
    consultationModal.addEventListener('click', (e) => {
        if (e.target === consultationModal) closeConsultation();
    });
  
    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });
  
    // --- Reviews System ---
    const reviewsData = [
        { name: "John Doe", rating: 5, comment: "The symptom checker was 100% accurate! I had a great interaction with the doctor afterward." },
        { name: "Jane Smith", rating: 5, comment: "Amazing tool! It helped me identify my symptoms quickly and accurately." },
        { name: "Alice Johnson", rating: 4, comment: "Very useful and easy to use. The doctor consultation was seamless." }
    ];
    const reviewsContainer = document.querySelector('.reviews-container');
    const addReviewBtn = document.getElementById('add-review-btn');
    const reviewModal = document.getElementById('review-form-modal');
    const closeReviewBtn = document.querySelector('.close-btn-review');
    const reviewForm = document.getElementById('review-form');
  
    function displayReviews() {
        reviewsContainer.innerHTML = '';
        reviewsData.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <h3>${review.name}</h3>
                <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p>"${review.comment}"</p>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }
  
    addReviewBtn.addEventListener('click', () => {
        reviewModal.style.display = 'flex';
        setTimeout(() => reviewModal.classList.add('show'), 10);
    });
  
    const closeReviewModal = () => {
        reviewModal.classList.remove('show');
        setTimeout(() => reviewModal.style.display = 'none', 300);
    };
  
    closeReviewBtn.addEventListener('click', closeReviewModal);
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) closeReviewModal();
    });
  
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        reviewsData.push({
            name: document.getElementById('name').value,
            rating: parseInt(document.getElementById('rating').value),
            comment: document.getElementById('comment').value
        });
        displayReviews();
        closeReviewModal();
        reviewForm.reset();
    });
  
    displayReviews();
  
    // --- Scroll Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
  
    revealElements.forEach(el => revealObserver.observe(el));
  });
  
  // --- Sticky Header Scroll Effect ---
  const mainHeader = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          mainHeader.classList.add('scrolled');
      } else {
          mainHeader.classList.remove('scrolled');
      }
  });
  