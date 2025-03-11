    // JavaScript to handle menu visibility
    const menuToggle = document.getElementById('menu-toggle');
    const menuContent = document.getElementById('menu-content');
    const navbar = document.getElementById('navbar');

    // Toggle menu visibility on click
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuContent.classList.toggle('hidden');
    });

// Leaflet Map
const map = L.map('map').setView([31.5, 34.47], 12); // Center on Gaza Strip

// BaseLayer
    var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: 'Map data &copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

// Remove zoom control from the map
map.zoomControl.remove();

//Full screen
// Get the button and map container elements
const fullScreenButton = document.querySelector('.screen-button');
const mapContainer = document.getElementById('map');

// Function to toggle fullscreen mode
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (mapContainer.requestFullscreen) {
            mapContainer.requestFullscreen();
        } else if (mapContainer.mozRequestFullScreen) { // Firefox
            mapContainer.mozRequestFullScreen();
        } else if (mapContainer.webkitRequestFullscreen) { // Chrome, Safari
            mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) { // IE/Edge
            mapContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}
  // Sticky element
  const mySticky = function () {
    // sticky
    var stickys = document.querySelectorAll('.sticky');
    if ( stickys !=null) {
      for (var i = 0; i < stickys.length; i++) {
        new hcSticky(stickys[i], {
          stickTo: stickys[i].parentNode,
          top: 28,
          bottomEnd: 0
        });
      }
    }
  }

// Add click event to the button
fullScreenButton.addEventListener('click', toggleFullScreen);

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
//Information : read more & read less
// Get the "Read More" button and the extra content div
 const toggleBtn = document.getElementById("toggleBtn");
                    const extraContent = document.getElementById("extraContent");
                  
                    // Add event listener to toggle content visibility
                    toggleBtn.addEventListener("click", () => {
                      // Toggle visibility of extra content
                      extraContent.classList.toggle("hidden");
                  
                      // Change button text depending on the state of the content
                      if (extraContent.classList.contains("hidden")) {
                        toggleBtn.textContent = "Read More";
                      } else {
                        toggleBtn.textContent = "Read Less";
                      }
                    });