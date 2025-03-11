fetch('../json/association.json')
    .then(response => response.json())
    .then(data => {
        const uniqueCategories = new Set();

        data.forEach(item => {
            if (item.category) {
                uniqueCategories.add(item.category);
            }
        });

        const categoriesArray = Array.from(uniqueCategories);
        // Add categories to the list
        document.querySelector('#categoryAssociationSelect').innerHTML = `
            <option value="All">All</option>
            ${categoriesArray.map(category => `<option value="${category}">${category}</option>`).join('')}
        `;

        // Function to render articles
        function renderAssociations(associations) {
            //console.log(associations)
            document.querySelector('#associationsCards').innerHTML = ""; // Clear existing cards
            associations.forEach(association => {
                document.querySelector('#associationsCards').innerHTML += `
                <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden">
                <img class="w-full h-48 object-cover" src="${association.image}" alt="${association.name}">
                <div class="p-6">
                    <div class="flex items-center">
                        <img class="h-10 w-10 rounded-full" src="${association.logo}" alt="${association.name}">
                        <h2 class="ml-3 text-xl font-semibold">${association.name}</h2>
                    </div>
                    <p class="mt-2 text-gray-600">${association.description}</p>
                    <div class="mt-4">
                        <p class="font-medium">Contact Information:</p>
                        <p>Email: <a href="${association.mail}" class="text-blue-500">${association.mail}</a></p>
                        <p>Phone: <a href="tel:${association.phone}" class="text-blue-500">${association.phone}</a></p>
                        <p>WhatsApp: <a href="https://wa.me/${association.whatsapp}" class="text-blue-500">${association.whatsapp}</a></p>
                        <p>Website: <a href="https://${association.website}" class="text-blue-500" target="_blank">${association.website}</a></p>
                    </div>
                    <div class="mt-4">
                        <p class="font-medium">Follow Us:</p>
                        <div class="flex space-x-2">
                            <a href="${association.social_media.fecebook}" class="text-blue-600 hover:text-blue-800">Facebook</a>
                            <a href="${association.social_media.twitter}" class="text-blue-600 hover:text-blue-800">Twitter</a>
                            <a href="${association.social_media.instagram}" class="text-blue-600 hover:text-blue-800">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>`; 
            });


        }

        // Initial render
    renderAssociations(data);

         // Search function
        document.querySelector("#searchAssociation").addEventListener("input", function () {
            let searchValue = this.value.toLowerCase();
            let searchedData = data.filter(i => i.name.toLowerCase().includes(searchValue));
            renderAssociations(searchedData);
        });

        // Filter by category
        document.querySelector('#categoryAssociationSelect').addEventListener('change', function() {
            let selectedValue = this.value;
            let filteredData = data.filter(article => selectedValue === "All" || selectedValue === article.category);
            renderAssociations(filteredData);
        });

    })
    .catch(error => console.error('Error fetching the data:', error));
