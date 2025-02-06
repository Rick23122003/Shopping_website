

function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();

gsap.to("#right-nav #menu",{
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger:{
        trigger: "#page1",
        scroller:"#main",
        // markers:true,
        start:"top 0",
        end:"top -5%",
        scrub: true
    }
})
var videocon = document.querySelector('#video-container');
var playbtn = document.querySelector('#play');

videocon.addEventListener('mouseenter', function () {
    gsap.to(playbtn, {
        scale: 1,
        opacity: 1,
    });
});

videocon.addEventListener('mouseleave', function () {
    gsap.to(playbtn, {
        scale: 0,
        opacity: 0,
    });
});

videocon.addEventListener('mousemove', function (event) {
    const rect = videocon.getBoundingClientRect(); // Get the container's dimensions
    const playSize = playbtn.offsetWidth / 2; // Half the button size for centering

    let x = event.clientX - rect.left - playSize; // Mouse X, adjusted for center
    let y = event.clientY - rect.top - playSize; // Mouse Y, adjusted for center

    // Constrain X and Y within the container's bounds
    x = Math.max(0, Math.min(x, rect.width - playbtn.offsetWidth));
    y = Math.max(0, Math.min(y, rect.height - playbtn.offsetHeight));

    // Update play button position
    gsap.to(playbtn, {
        left: `${x}px`,
        top: `${y}px`,
        duration: 0.1, // Smooth movement
    });
});


// GSAP animations for page elements
gsap.from('#page1 h1', {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
});

gsap.from('#page1 #video-container', {
    scale: 0.8,
    opacity: 0,
    delay: 0.7,
    duration: 0.9,
});

// // Select the pointer and the images
//  const pointer = document.querySelector("#pointer");
// const productImages = document.querySelectorAll("#page4 .image");

// // Add event listeners to each product image
// productImages.forEach((image) => {
//     // When the mouse enters a product image
//     image.addEventListener("mouseenter", () => {
//         gsap.to(pointer, {
//             scale: 1,
//             opacity: 1,
//         });
//     });

//     // When the mouse leaves a product image
//     image.addEventListener("mouseleave", () => {
//         gsap.to(pointer, {
//             scale: 0,
//             opacity: 0,
//         });
//     });

//     // When the mouse moves over a product image
//     image.addEventListener("mousemove", (event) => {
//         const rect = image.getBoundingClientRect(); // Get the dimensions of the image
//         const pointerSize = pointer.offsetWidth / 2; // Adjust for pointer centering

//         let x = event.clientX - rect.left - pointerSize; // Mouse X, adjusted for center
//         let y = event.clientY - rect.top - pointerSize; // Mouse Y, adjusted for center

//         // Update pointer position
//         gsap.to(pointer, {
//             left: `${event.clientX}px`,
//             top: `${event.clientY}px`,
//             duration: 0.1, // Smooth movement
//         });
//     });
// });

// Select the pointer element

// ---------------------------------------------------------------------------------------------------------

// const pointer = document.getElementById("pointer");

// // Function to update pointer position
// const updatePointerPosition = (e) => {
//     pointer.style.left = `${e.pageX}px`;
//     pointer.style.top = `${e.pageY}px`;
// };

// // Select all product images
// const productImages = document.querySelectorAll(".image");

// // Activate pointer on hover
// productImages.forEach((image) => {
//     image.addEventListener("mouseenter", () => {
//         pointer.style.display = "block"; // Show the pointer
//         gsap.to(pointer,{
//             duration: 0.2
//         })
//     });

//     image.addEventListener("mousemove", updatePointerPosition); // Track mouse movement on the image

//     image.addEventListener("mouseleave", () => {
//         pointer.style.display = "none"; // Hide the pointer when not hovering
//     });
// });

document.addEventListener("mousemove",function(dets){
    gsap.to('#pointer',{
        left:dets.x,
        top:dets.y
    })
})
// Move pointer with the mouse
document.addEventListener("mousemove", function (dets) {
    gsap.to('#pointer', {
        left: dets.x,
        top: dets.y
    });
});

// Add event listeners to all images
document.querySelectorAll('.image').forEach(image => {
    image.addEventListener('mouseenter', function () {
        gsap.to("#pointer", {
            transform: 'translate(-50%,-50%) scale(1)' // Activate pointer
        });
    });

    image.addEventListener('mouseleave', function () {
        gsap.to("#pointer", {
            transform: 'translate(-50%,-50%) scale(0)' // Deactivate pointer
        });
    });
});
