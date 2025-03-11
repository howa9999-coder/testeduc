    fetch('../json/boycott.json')
    .then(response => response.json())
    .then(data => {
        const uniqueCategories = new Set();
//Product categories
        data.forEach(item => {
            if (item.category) {
                uniqueCategories.add(item.category);
            }
        });

        const categoriesArray = Array.from(uniqueCategories);
        document.querySelector('#categoryProductSelect').innerHTML = `
            <option value="All">All</option>
            ${categoriesArray.map(category => `<option value="${category}">${category}</option>`).join('')}
        `;

        

        function renderProducts(products) {
            document.querySelector('#boycottCard').innerHTML = ""
            products.forEach(product => {
                document.querySelector('#boycottCard').innerHTML += `
                <div class="max-w-sm relative rounded bg-white overflow-hidden shadow-lg m-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <img class="w-full h-[250px] md:h-[400px] mx-auto p-2 border-2 border-gray-300 rounded shadow-lg transition-all duration-300 ease-in-out hover:scale-110" src="${product.picture}" alt="${product.name}">
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${product.name}</div>
        <p class="text-gray-700 text-base">
            <strong>Reason for Boycott:</strong> ${product.reason}
        </p>
        <p class="text-gray-700 text-base">
            <strong>Description:</strong> ${product.description}
        </p>
        <p class="text-gray-700 text-base">
            <strong>Date:</strong> ${product.date}
        </p>
    </div>
    <button class="learn-more absolute bottom-0 right-0 z-20 text-blue-500 cursor-pointer p-2 bg-transparent border-none" data-product="${product.name}">
        Learn more
    </button>
</div>
                `;
            });
             // Attach event listeners to all read buttons
             document.querySelectorAll('.learn-more').forEach(learn => {
                learn.addEventListener('click', function() {
                    const product = this.getAttribute('data-product');
                    localStorage.setItem('product', product);
                    window.location.href = "../html/boycottProduct.html"; 
                });
            });




        }


        // Initial render
        renderProducts(data);

        // Search function
        document.querySelector("#searchProduct").addEventListener("input", function () {
            let searchValue = this.value.toLowerCase();
            filteredData = data.filter(i => i.name.toLowerCase().includes(searchValue)); // Adjusted to search by product
            renderProducts(filteredData);
        });

        // Filter by category
        document.querySelector('#categoryProductSelect').addEventListener('change', function() {
            let selectedValue = this.value;
            filteredData = data.filter(product => selectedValue === "All" || selectedValue === product.category);
            
            renderProducts(filteredData);
        });

    })
    .catch(error => console.error('Error fetching the data:', error));
