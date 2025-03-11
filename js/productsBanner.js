fetch('../json/boycott.json')
    .then(response => response.json())
    .then(data => {

        data.forEach(product => {
            document.querySelector('.products-banner').innerHTML += `
            <img src="${product.picture}" alt="${product.name}" class="w-16 inline-block h-16 mr-[30px] md:mr-[100px]  rounded-full">

            `;
        });
    })
    .catch(error => console.error('Error fetching urgent news:', error));