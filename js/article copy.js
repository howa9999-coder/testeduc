
     fetch('../json/layer.json')
    .then(response => response.json())
    .then(data => {
        const uniqueCategories = new Set();

        data.forEach(item => {
            if (item.category) {
                uniqueCategories.add(item.category);
            }
        });

        // Convert the Set back to an array if needed
        const categoriesArray = Array.from(uniqueCategories);
        //Add categories to the list
        for(let category of categoriesArray){
            document.querySelector('#categorySelect').innerHTML += `
            <option value="${category}"> ${category} </option>   `
        }
        //Add article card
        function renderArticles(articles) {
            for(let article of articles){
                //  console.log(article)
                  document.querySelector('#card').innerHTML += `
                    <div class="bg-white shadow-lg rounded-lg p-4 relative">
                    <h2 class="text-xl font-semibold">${article.title}</h2>                   
                    <p class="text-gray-700 mt-2">${article.description}</p>
                    <div class="mt-4 text-sm text-gray-500">
                        <p>Author: ${article.author}</p>
                        <p>Date: ${article.date}</p>
                        <p>Category: ${article.category}</p>
                    </div>
                    <button id="${article.name}" class="absolute bottom-4 right-4 text-blue-500 cursor-pointer p-0 bg-transparent border-none">
                        Read
                    </button>
                </div>`
                       }
            }
            renderArticles(data)

        
        

 //**************************************************************************** */ Search function
document.querySelector("#search").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let searchedData = data.filter(i => i.name.toLowerCase().includes(searchValue));
   // console.log(searchedData);
    
    document.querySelector('#card').innerHTML = "";

    searchedData.forEach(article => {
        document.querySelector('#card').innerHTML += `
                    <div class="bg-white shadow-lg rounded-lg p-4 relative">
                    <h2 class="text-xl font-semibold">${article.title}</h2>                   
                    <p class="text-gray-700 mt-2">${article.description}</p>
                    <div class="mt-4 text-sm text-gray-500">
                        <p>Author: ${article.author}</p>
                        <p>Date: ${article.date}</p>
                        <p>Category: ${article.category}</p>
                    </div>
                    <button id="${article.name}" class="absolute bottom-4 right-4 text-blue-500 cursor-pointer p-0 bg-transparent border-none">
                        Read
                    </button>
                </div>
        `;
        document.querySelector(`#${article.name}`).addEventListener('click', function() {
            let title = article.title
            //Storage title in local storage
            localStorage.setItem('title', title);
            // Redirect to the article page
            window.location.href = "../html/art.html"; 
            });
    });
});
 //********************************************************************************Filtre => category
document.querySelector('#categorySelect').addEventListener('change', function() {
    let selectedValue = this.value;
    // Clear the existing cards
    document.querySelector('#card').innerHTML = '';

    // Check if the selected value is "All"
    data.forEach(article => {
        if (selectedValue === "All" || selectedValue === article.category) {
            document.querySelector('#card').innerHTML += `
                <div class="bg-white shadow-lg rounded-lg p-4 relative">
                    <h2 class="text-xl font-semibold">${article.title}</h2>
                    <p class="text-gray-700 mt-2">${article.description}</p>
                    <div class="mt-4 text-sm text-gray-500">
                        <p>Author: ${article.author}</p>
                        <p>Date: ${article.date}</p>
                        <p>Category: ${article.category}</p>
                    </div>
                    <button id="${article.name}" class="absolute bottom-4 right-4 text-blue-500 cursor-pointer p-0 bg-transparent border-none">
                        Read
                    </button>
                </div>
            `;
            document.querySelector(`#${article.name}`).addEventListener('click', function() {
                let title = article.title
                //Storage title in local storage
                localStorage.setItem('title', title);
                // Redirect to the article page
                window.location.href = "../html/art.html"; 
                });
        }
    });
});


    //*************************************************************************************** */ NEW OR OLD
    document.getElementById('articleSort').addEventListener('change', function() {
           // Clear the existing cards
        document.querySelector('#card').innerHTML = '';
        const selectedValue = this.value;

        let sortedData;
        if (selectedValue === 'latest') {
            // Sort articles by date (latest first)
            sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        } else if (selectedValue === 'oldest') {
            // Sort articles by date (oldest first)
            sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            // If no option is selected, just use the original data
            sortedData = data;
        }

        renderArticles(sortedData); // Render sorted articles
    });
        //*************************************************************************************** to the article page

        data.forEach(article => {
            document.querySelector(`#${article.name}`).addEventListener('click', function() {
            let title = article.title
            //Storage title in local storage
            localStorage.setItem('title', title);
            // Redirect to the article page
            window.location.href = "../html/art.html"; 
            });
        });  
        
  
    

    })
    .catch(error => console.error('Error fetching the data:', error));
 