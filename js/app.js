// Global Variables
const scrollAnimationMouse = document.querySelector('.scroll-animation-mouse');
let lastStateOfDevice = "";
let showMouseIconState = false;
let wolfVideo = document.querySelector('.banner-video');
let listOfLazyPlayVideoId = ["industrialMetaverse", "cloudGaming"];
var lastScrollTop = 0;
var scrollValidation = 60

var animeImageWidth = 1920, animeImageHeight = 888;
var deviceWidth, deviceHeight;
var ratioDeviceWidth = 21;
var ratioDeviceHeight = 9.7125;

var gap = 0;
var animeList = [];


// Function to update the user's device type based on screen width
function updateScreenSizeData() {
  deviceWidth = window.outerWidth;
  deviceHeight = window.outerHeight;
  console.log("Width : " + deviceWidth + "   |   " + "Height : " + deviceHeight)

  // Get the inner width of the browser window
  let body = document.querySelector("body");
  let deviceDataset = body.dataset.userDevice;
  let device;

  if (deviceWidth < 576 && deviceDataset != "mobile") {
    device = "mobile";
  } else if (
    deviceWidth >= 576 &&
    deviceWidth <= 992 &&
    deviceDataset != "tablet"
  ) {
    device = "tablet";
  } else if (deviceWidth > 992 && deviceDataset != "desktop") {
    device = "desktop";
  }

  if (lastStateOfDevice != device) {
    body.dataset.userDevice = device || deviceDataset;
    lastStateOfDevice = device;
  }

  checkAnimeSizing();

}

function checkAnimeSizing() {
  let checkRatio = (deviceHeight * ratioDeviceWidth) / deviceWidth > ratioDeviceHeight;
  let imageHeight;

  if (deviceWidth > 1400) {
    imageHeight = 559.4

  } else if (deviceWidth >= 1200) {
    imageHeight = 516.15;

  } else if (deviceWidth >= 992) {
    imageHeight = 432.9;

  } else if (deviceWidth >= 768) {
    imageHeight = 321.9;

  } else if (deviceWidth >= 576) {
    imageHeight = 238.65;

  } else if (deviceWidth < 576) {
    imageHeight = 238.65;

  }
  gap = (deviceHeight - imageHeight) / 2
}

// Execute the function for the first time to display the initial screen width
updateScreenSizeData();

// Check for browser window resize and update the screen width using the resize event
window.addEventListener("resize", () => {

  let hamed = window.innerHeight -  deviceHeight < 0 ? -1 * (window.innerHeight -  deviceHeight) : (window.innerHeight -  deviceHeight) ;

  if(hamed > 200 ){
    updateScreenSizeData();
    animeList.forEach(item => {
      item.scrollTrigger.kill(true, true);
    });
    animeList = [];
    generateTrigger();
  }
 
});

// Function to show the mouse icon
let showMouseIcon = () => {
  document.querySelector('.banner-section').classList.add('show-mouse_icon');
  showMouseIconState = true;
  // clearInterval(wolfVideoTime);
}

var player = videojs('wolf');

player.on('timeupdate', function () {
  var currentTime = player.currentTime();
  if (currentTime > 6 && showMouseIconState == false) {
    showMouseIcon();
  }
});

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


const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasScrolling')
document.querySelectorAll('.offcanvas .nav-item').forEach(function (el) {
  el.addEventListener('click', function () {
    bsOffcanvas.hide();
  })

})


var makeAnime = function (id, width, height, fCount, startFrame, src, scrollTriggerElClass) {

  const canvas = document.getElementById(id);
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  const frameCount = fCount;
  const currentFrame = index => (`${src}_${(index + 1).toString().padStart(5, '0')}.jpg`);

  const images = []
  const canvasAnime = {
    frame: startFrame
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  let animeItem = gsap.to(canvasAnime, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    // pin: ".pin",
    scrollTrigger: {
      trigger: scrollTriggerElClass,
      scrub: 1,
      pin: true,
      // start: lastStateOfDevice == "desktop" ? "-150px" : "-250px",
      start: "-" + gap + "px",
      end: "1500px  ",
      // markers: true,
      onEnter: (a, b) => {
        // alert('start');
        scrollAnimationMouse.classList.add('active');
        canvas.classList.remove('notStart');
      },
      onEnterBack: (a, b) => {
        // alert('start-Back');
        scrollAnimationMouse.classList.add('active');
        canvas.classList.remove('finished');
      },
      onLeave: (a, b) => {
        // alert('leave');
        scrollAnimationMouse.classList.remove('active');
        canvas.classList.add('finished');
      },
      onLeaveBack: (a, b) => {
        // alert('leave-back');
        scrollAnimationMouse.classList.remove('active');
        canvas.classList.add('notStart');
      },
    },
    onUpdate: render,// use animation onUpdate instead of scrollTrigger's onUpdate

  });

  animeList.push(animeItem);

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[canvasAnime.frame], 0, 0);
  }

}

var reMakeAnime = function () {

}

function generateTrigger() {
  makeAnime('scrollMetaverse', animeImageWidth, animeImageHeight, 134, 0, 'img/metavers/t5', ".scroll-metaverse-trigger");
  makeAnime('scrollGpu', animeImageWidth, animeImageHeight, 91, 1, 'img/gpu animation/gpu_1', ".scroll-gpu-trigger");
  // makeAnime('scrollSecure', 1920, 888, 94, 4, 'img/gpu animation/gpu 1', ".scroll-secure-trigger")
}

window.addEventListener("load", function () {
  // Function to create animation using GSAP library
  setTimeout(function () {
    generateTrigger();
  }, 1000)
});

const langSelect = document.querySelector('.alpha-language-dropdown select');
langSelect.addEventListener("change", function () {
  window.open(langSelect.selectedOptions[0].value, "_self")
})