//Associations Slide

let currentIndex = 0;
    
    function updateCarousel() {
            const carousel = document.getElementById('carousel');
            const totalItems = carousel.children.length;
            const itemWidth = carousel.children[0].clientWidth;
            const offset = -currentIndex * itemWidth;
            carousel.style.transform = `translateX(${offset}px)`;
    }
    
    function nextSlide() {
            const carousel = document.getElementById('carousel');
            const totalItems = carousel.children.length;
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
    }
    
    function prevSlide() {
            const carousel = document.getElementById('carousel');
            const totalItems = carousel.children.length;
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
    }
//fetch data
    fetch('../json/association.json')
    .then(response => response.json())
    .then(data => {
       // console.log(data)
        data.forEach(item => {

        // Function to render articles
        function renderAssociations(associations) {
            //console.log(associations)
            document.querySelector('#carousel').innerHTML = ""; // Clear existing cards
            associations.forEach(association => {
                document.querySelector('#carousel').innerHTML += `<div class="flex-none w-full md:w-1/3 p-2">
                                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img src="${association.logo}" alt="${association.name}" class="w-16 h-16 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
                                    <div class="p-4">
                                        <h3 class="font-semibold text-lg">${association.name}</h3>
                                        <p class="mt-2 text-gray-600">${association.description}</p>
                                        <a href="${association.website}" class="mt-4 inline-block text-blue-500 hover:underline">${association.website}</a>
                                        <div class="mt-4">
                                            <p class="font-medium">Follow Us:</p>
                                            <div class="flex space-x-2">
                                                <a href="${association.social_media.fecebook}" class="text-blue-600 hover:text-blue-800">Facebook</a>
                                                <a href="${association.social_media.twitter}" class="text-blue-600 hover:text-blue-800">Twitter</a>
                                                <a href="${association.social_media.instagram}" class="text-blue-600 hover:text-blue-800">Instagram</a>
                                            </div>
                                        </div>
                                        </div>                         
                                </div>                            
                            </div>`; 
            });


        }
                // Initial render
    renderAssociations(data);
    })

    }) 