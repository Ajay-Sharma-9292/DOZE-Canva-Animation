const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};

const images = [];
let imagesLoaded = 0;

function preloadImages() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpg`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        // console.log("all images loaded")
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY)

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: "top top",
            scrub: 2,
            end: "bottom bottom"
        }
    })

    function updateFrame (index){
      return  {
            currentIndex: index,
            ease: "linear",
            onUpdate: function (){
                loadImage(Math.floor(frames.currentIndex));
            }
        }
    }

    tl
    .to(frames,updateFrame(90), "a")
    .to(".animate1", {opacity:0 , ease: "linear" }, "a")

    .to(frames,updateFrame(180), "b")
    .to(".animate2", {opacity:1 , ease: "linear" }, "b")

    .to(frames,updateFrame(270), "c")
    .to(".animate2", {opacity:1 , ease: "linear" }, "c")

    .to(frames,updateFrame(360), "d")
    .to(".animate2", {opacity:0 , ease: "linear" }, "d")

    .to(frames,updateFrame(450), "e")
    .to(".animate3", {opacity:1 , ease: "linear" }, "e")

    .to(frames,updateFrame(540), "f")
    .to(".animate3", {opacity:1 , ease: "linear" }, "f")

    .to(frames,updateFrame(630), "g")
    .to(".animate3", {opacity:0 , ease: "linear" }, "g")

    .to(frames,updateFrame(720), "h")
    .to(".panel", {x: "0%" , ease: "expo" }, "h")

    .to(frames,updateFrame(810), "i")
    .to(".panel", {x: "0%" , ease: "expo" }, "i")

    .to(frames,updateFrame(900), "j")
    .to(".panel", {opacity:0 , ease: "linear" }, "j")

    .to(frames,updateFrame(990), "k")
    .to("canvas", {scale: .5 , ease: "linear" }, "k")

    .to(frames,updateFrame(1080), "l")
    .to(".panelism", {opacity: 1 , ease: "expo" }, "l")

    .to(frames,updateFrame(1170), "l")
    .to(".panelism span", {width: 200 , ease: "expo" }, "l")

    .to(frames,updateFrame(1260), "m")
    .to("canvas", {scale: 1 , ease: "linear" }, "m")

    .to(frames,updateFrame(1300), "n")
    .to(".panelism", {scale: 2 , ease: "circ" }, "n")

    .to(frames,updateFrame(1340), "o")
    .to(".panelism", {scale: 2 , ease: "circ" }, "o")
}

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


preloadImages();


window.addEventListener("resize", function (){
    loadImage(Math.floor(frames.currentIndex));
})
 
document.querySelectorAll(".headings h3")
.forEach(function (elem){
    gsap.from(elem,{
        scrollTrigger:{
            trigger: elem,
            start: "top 90%",
            end: "bottom 20%",
            scrub:2
        },
        opacity: .2
    })
})


