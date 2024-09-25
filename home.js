const newsContainer = document.querySelector('.news-images');
const newsItems = document.querySelectorAll('.news-image');
let currentIndex = 0;
const totalNews = newsItems.length;

// Function to clone images infinitely
function cloneImages() {
    newsItems.forEach(item => {
        const clone = item.cloneNode(true);
        newsContainer.appendChild(clone);
    });
}

// Call the clone function to duplicate images
cloneImages();

function showNews() {
    currentIndex++;

    if (currentIndex >= totalNews) {
        currentIndex = 0; // Reset to the first image
        newsContainer.style.transition = 'none'; // Disable transition for instant jump
        newsContainer.style.transform = `translateX(0)`; // Reset position
        setTimeout(() => {
            newsContainer.style.transition = 'transform 0.5s ease-in-out'; // Enable transition
        }, 50); // Small delay to allow for the reset
    } else {
        newsContainer.style.transition = 'transform 0.5s ease-in-out';
    }

    newsContainer.style.transform = `translateX(-${(currentIndex * (100 / totalNews))}%)`; // Adjust for visible items
}

// Automatic news slideshow
setInterval(showNews, 700); // Change every 0.7 seconds

// Initial display
showNews();
