// Register GSAP plugins
gsap.registerPlugin(MorphSVGPlugin);

// Get elements
const videoContainer = document.getElementById("videoContainer");
const morphPath = document.getElementById("morphPath");
const netflixPath = document.getElementById("netflixPath");
const wbLogo = document.getElementById("wbLogo");

let isPlaying = false;
let hasPlayed = false;

// Create the morph animation timeline
const morphTimeline = gsap.timeline({
  paused: true,
  onComplete: () => {
    // Reset after animation completes
    setTimeout(() => {
      videoContainer.classList.remove("playing");
      isPlaying = false;
    }, 1000);
  },
});

// Build the animation sequence
morphTimeline
  // Initial fade in of Warner Bros logo
  .from(wbLogo, {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  })
  // Hold Warner Bros logo
  .to({}, { duration: 1 })
  // Scale up slightly before morph
  .to(wbLogo, {
    scale: 1.1,
    duration: 0.3,
    ease: "power1.inOut",
  })
  // The morph animation
  .to(
    morphPath,
    {
      morphSVG: netflixPath,
      duration: 1.5,
      ease: "power2.inOut",
    },
    "-=0.1"
  )
  // Color change during morph
  .to(
    morphPath,
    {
      fill: "#E50914",
      duration: 1,
      ease: "none",
    },
    "-=1.2"
  )
  // Scale back to normal
  .to(
    wbLogo,
    {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.8"
  )
  // Pulse effect at the end
  .to(wbLogo, {
    scale: 1.05,
    duration: 0.3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: 1,
  });

videoContainer.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    videoContainer.classList.add("playing");

    if (hasPlayed) {
      // Reset the morph before playing again
      gsap.set(morphPath, {
        morphSVG: morphPath,
        fill: "#FFD700",
      });
      gsap.set(wbLogo, { scale: 1 });
    }

    morphTimeline.restart();
    hasPlayed = true;
  }
});

// Auto-play once on load
window.addEventListener("load", () => {
  setTimeout(() => {
    if (!hasPlayed) {
      videoContainer.click();
    }
  }, 500);
});
