// Retrieve the dataMap from local storage
var product = localStorage.getItem('product');

fetch('../json/boycott.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(i => {
            if(product == i.name){
                console.log(i.name, i.title)
               // ************************************************************************************Title and article and picture
               document.querySelector('#product').innerHTML = ` 
                    <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-x-4 sm:space-y-0">
                        <div class="text-center sm:text-left">
                                        <img src="${i.picture}" alt="${i.name}" class="w-32 h-32 mx-auto md:mx-0 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">

                        <h1 class="text-3xl font-bold text-gray-800 mb-4">${i.name}</h1>
                        <h2 class="text-2xl font-semibold text-gray-600 mb-2">${i.description}</h2>
                        </div>

                    </div>
                    <p class="text-gray-700">${i.article}</p>   
                    `  
            }
        })});


    //****************************************************************share & download

    // Automatically get the article URL
    const articleUrl = window.location.href;

    // Set the share links
    document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
    document.getElementById('twitterShare').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}`;
    document.getElementById('linkedinShare').href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}`;
