/* ============================
   SELECT ELEMENTS FROM HTML
============================ */

// all gallery images
const images = document.querySelectorAll(".gallery-img");

// lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// navigation buttons
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const closeBtn = document.getElementById("close");

// category elements
const toggleBtn = document.getElementById("category-toggle");
const categoryBar = document.getElementById("category-bar");
const categoryButtons = document.querySelectorAll(".category-btn");
const showCategoryBtn = document.getElementById("show-category-btn");

/* ============================
   LIGHTBOX VARIABLES
============================ */

let currentIndex = 0;   // which image is open
let scale = 1;          // zoom level


/* ============================
   OPEN IMAGE IN LIGHTBOX
============================ */

images.forEach((img, index) => {

    img.addEventListener("click", function () {

        // store which image was clicked
        currentIndex = index;

        // show that image
        showImage();

        // show lightbox
        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");

    });

});


/* ============================
   SHOW CURRENT IMAGE
============================ */

function showImage() {

    // change lightbox image source
    lightboxImg.src = images[currentIndex].src;

    // reset zoom when changing image
    scale = 1;
    lightboxImg.style.transform = "scale(1)";

}


/* ============================
   NEXT IMAGE BUTTON
============================ */

nextBtn.addEventListener("click", function () {

    // move to next image
    currentIndex = currentIndex + 1;

    // loop back if last image
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage();

});


/* ============================
   PREVIOUS IMAGE BUTTON
============================ */

prevBtn.addEventListener("click", function () {

    currentIndex = currentIndex - 1;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showImage();

});


/* ============================
   CLOSE LIGHTBOX
============================ */

closeBtn.addEventListener("click", function () {

    lightbox.classList.add("hidden");

});


/* ============================
   CLICK OUTSIDE TO CLOSE
============================ */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.classList.add("hidden");

    }

});


/* ============================
   ZOOM IMAGE WITH MOUSE WHEEL
============================ */

lightboxImg.addEventListener("wheel", function (event) {

    event.preventDefault();

    if (event.deltaY < 0) {

        // zoom in
        scale = scale + 0.1;

    } else {

        // zoom out
        scale = scale - 0.1;

    }

    // limit zoom level
    if (scale < 0.5) {
        scale = 0.5;
    }

    if (scale > 3) {
        scale = 3;
    }

    lightboxImg.style.transform = "scale(" + scale + ")";

});


/* ============================
   SHOW / HIDE CATEGORY BAR
============================ */

toggleBtn.addEventListener("click", function () {

    categoryBar.classList.toggle("hidden");

    if (showCategoryBtn.innerText == "Select Category") {
        showCategoryBtn.innerText = "Hide Catergories";
    }
    else {
        showCategoryBtn.innerText = "Select Category";
    }

});


/* ============================
   CATEGORY FILTER LOGIC
============================ */

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // get selected category
        const selectedCategory = button.dataset.category;

        // loop through every image
        images.forEach(function (img) {

            const imgCategory = img.dataset.category;

            // show image if category matches
            if (selectedCategory === "all" || imgCategory === selectedCategory) {

                img.style.display = "block";

            } else {

                img.style.display = "none";

            }

        });

        /* ============================
           UPDATE ACTIVE BUTTON STYLE
        ============================= */

        categoryButtons.forEach(function (btn) {

            btn.classList.remove("bg-[#8A7650]");
            btn.classList.remove("text-white");

        });

        button.classList.add("bg-[#8A7650]");
        button.classList.add("text-white");

    });

});


// show catergory btn

