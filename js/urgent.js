fetch('../json/urgent.json')
    .then(response => response.json())
    .then(data => {
        // Get today's date in YYYY-MM-DD format (to compare with the news timestamp)
        const today = new Date().toISOString().split('T')[0];

        // Filter the urgent news to get only today's news
        const todaysNews = data.filter(urgent => urgent.timestamp.split('T')[0] === today);

        // Limit the results to the first 3 urgent news
        const topUrgentNews = todaysNews.slice(0, 3);

        // Insert the headlines into the marquee
        const marqueeElement = document.querySelector('.marquee');

        topUrgentNews.forEach(urgent => {
            marqueeElement.innerHTML += `
            <span class="px-4">${urgent.headline}</span>
            `;
        });
    })
    .catch(error => console.error('Error fetching urgent news:', error));
