//Draggable nav

const toggleElement = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');

// Function to handle toggling
function toggleClass() {
    toggleElement.classList.toggle('active');
    navigation.classList.toggle('active');
}

// Handle both 'dblclick' and 'touchstart' events
toggleElement.ondblclick = toggleClass;

// For touch devices, simulate a 'dblclick' on touchstart
let lastTouchTime = 0;
toggleElement.addEventListener('touchstart', function(e) {
    const currentTime = new Date().getTime();
    
    // Check if the touch event is occurring within 300ms of the last one (simulating double-tap)
    if (currentTime - lastTouchTime < 300) {
        toggleClass();
    }
    
    lastTouchTime = currentTime;
});



$(function() {
    let isFixed = false; // Track if the navigation is fixed

    $(".navigation").draggable({
        stop: function(event, ui) {
            const position = $(this).position();
            if (position.top < 0 || position.left < 0) {
                $(this).css({ /*top: '10%',*/ right: '50%' });
            }
            // Update isFixed status based on the position of the navigation
            isFixed = ui.position.top <= 10; // Set isFixed if dragged near the top
        }
    });

    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const navPosition = $(".navigation").position();

        // Check if the navigation should become fixed
        if (scrollTop > navPosition.top && !isFixed) {
            isFixed = true;
            $(".navigation").css({
                position: 'fixed',
              /*  top: '10px',*/
                left: navPosition.left
            });
        }

        // Check if the navigation should go back to its original position
        if (scrollTop < navPosition.top && isFixed) {
            isFixed = false;
            $(".navigation").css({
                position: 'absolute',
                top: navPosition.top,
                left: navPosition.left
            });
        }
    });
});




 //Add logo to float
/* fetch('../json/boycott.json')
.then(response => response.json())
.then(data => {

    function renderProducts(products) {
    //    document.querySelector('#logo').innerHTML = ""
        products.forEach(product => {
            document.querySelector('#logo').innerHTML += `
           
            <button class=" see inline-block cursor-pointer  bg-transparent border-none" data-product="${product.name}">
                     <img src="${product.picture}" alt="${product.name}" class="w-16 h-16 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">

                    </button>   
            `;
        });

         // Attach event listeners to all read buttons
         document.querySelectorAll('.see').forEach(learn => {
            learn.addEventListener('click', function() {
                const product = this.getAttribute('data-product');
                localStorage.setItem('product', product);
                window.location.href = "../html/boycottProduct.html"; 
            });
        });





    }


    

    // Initial render
    renderProducts(data);



})
.catch(error => console.error('Error fetching the data:', error));  */

fetch('../json/boycott.json')
  .then(response => response.json())
  .then(data => {

    function renderProducts(products) {
      const limit = 8; // Define the limit for displaying logos
      const displayProducts = products.slice(0, limit); // Slice the array to get the first 8 products

      displayProducts.forEach(product => {
        document.querySelector('#logo').innerHTML += `
          <button class="see-btn inline-block cursor-pointer bg-transparent border-none" data-product="${product.name}">
            <img src="${product.picture}" alt="${product.name}" class="w-16 h-16 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
          </button>
        `;

      });


      // If there are more products than the limit, show the "See More" button
      if (products.length > limit) {
        document.querySelector('#logo').innerHTML += `
          <button id="see-more-btn" class="mt-4 inline-block cursor-pointer bg-transparent border-none text-blue-500">
            See More
          </button>
        `;
        
        // Event listener for the "See More" button to navigate to another page
        document.querySelector('#see-more-btn').addEventListener('click', function() {
          window.location.href = `../html/boycottList.html`; 
        });
      }
    }

    // Initial render
    renderProducts(data);

  })
  .catch(error => console.error('Error fetching the data:', error));

