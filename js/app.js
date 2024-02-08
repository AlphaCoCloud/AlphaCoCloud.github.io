// Global Variables
const scrollAnimationMouse = document.querySelector('.scroll-animation-mouse');
let lastStateOfDevice = "";
let showMouseIconState = false;
let wolfVideo = document.querySelector('.banner-video');
let listOfLazyPlayVideoId = ["industrialMetaverse", "cloudGaming"];
var lastScrollTop = 0;
var scrollValidation = 60

// Function to update the user's device type based on screen width
function updateScreenWidth() {
  var screenWidth = window.innerWidth;
  // Get the inner width of the browser window
  let body = document.querySelector("body");
  let deviceDataset = body.dataset.userDevice;
  let device;

  if (screenWidth < 576 && deviceDataset != "mobile") {
    device = "mobile";
  } else if (
    screenWidth >= 576 &&
    screenWidth <= 992 &&
    deviceDataset != "tablet"
  ) {
    device = "tablet";
  } else if (screenWidth > 992 && deviceDataset != "desktop") {
    device = "desktop";
  }

  if (lastStateOfDevice != device) {
    body.dataset.userDevice = device || deviceDataset;
    lastStateOfDevice = device;
  }
}

// Execute the function for the first time to display the initial screen width
updateScreenWidth();

// Check for browser window resize and update the screen width using the resize event
window.addEventListener("resize", updateScreenWidth);

// Function to create animation using GSAP library
function makeAnime(id, width, height, fCount, startFrame, src, scrollTriggerElClass) {

  const canvas = document.getElementById(id);
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  const frameCount = fCount;
  const currentFrame = index => (`${src}_${(index + 1).toString().padStart(5, '0')}.jpg`);

  const images = []
  const airpods = {
    frame: startFrame
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    // pin: ".pin",
    scrollTrigger: {
      trigger: scrollTriggerElClass,
      scrub: 1,
      pin: true,
      start: lastStateOfDevice == "desktop" ? "-150px" : "-250px",
      end: "1500px  ",
      // markers: true,
      onEnter: (a, b) => {
        // alert('start');
        scrollAnimationMouse.classList.add('active');
      },
      onEnterBack: (a, b) => {
        // alert('start-Back');
        scrollAnimationMouse.classList.add('active');
      },
      onLeave: (a, b) => {
        // alert('leave');
        scrollAnimationMouse.classList.remove('active');
      },
      onLeaveBack: (a, b) => {
        // alert('leave-back');
        scrollAnimationMouse.classList.remove('active');
      },
    },
    onUpdate: render,// use animation onUpdate instead of scrollTrigger's onUpdate

  });

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[airpods.frame], 0, 0);
  }

}

setTimeout(function () {
  makeAnime('scrollMetaverse', 1920, 888, 134, 0, 'img/metavers/t5', ".scroll-metaverse-trigger");
  makeAnime('scrollGpu', 1920, 888, 91, 1, 'img/gpu_animation/gpu_1', ".scroll-gpu-trigger");
  // makeAnime('scrollSecure', 1920, 888, 94, 4, 'img/gpu animation/gpu 1', ".scroll-secure-trigger")
}, 1000)

// Function to show the mouse icon
let showMouseIcon = () => {
  document.querySelector('.banner-section').classList.add('show-mouse_icon');
  showMouseIconState = true;
  clearInterval(wolfVideoTime);
}

// Interval to check the time of the wolfVideo
var wolfVideoTime = setInterval(() => {
  if (wolfVideo.currentTime > 6 && showMouseIconState == false) {
    showMouseIcon();
  }
}, 100);

// IntersectionObserver for lazy loading and playing videos
listOfLazyPlayVideoId.forEach((videoId) => {

  let vid = document.getElementById(videoId)
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        vid.play()
      } else {
        vid.pause();
      }
    })
  })
  observer.observe(vid)
})

// Function to scroll the page to the top smoothly
/**
 * This function scrolls the page to the top smoothly
 * use in All page
 */
function goTopScroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Event listener for scroll events
document.addEventListener("scroll", function () {
  var st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop && st >= scrollValidation) {
    // console.log('downScroll code : ' + st)
    document.querySelector('.header-section').classList.add('hide-header')
    document.querySelector('.header-section').classList.remove('show-header')

  } else if (st < lastScrollTop && st >= scrollValidation) {
    // console.log('upScroll code : ' + st)
    document.querySelector('.header-section').classList.add('show-header')
    document.querySelector('.header-section').classList.remove('hide-header')

  } else {
    document.querySelector('.header-section').classList.remove('show-header')
    document.querySelector('.header-section').classList.remove('hide-header')
  }

  if (showMouseIconState == false && st >= scrollValidation) {
    showMouseIcon();
  }
  lastScrollTop = st <= 0 ? 0 : st;


}, false);