/* video_embedded.js — Video Colorado
 * Controls all YouTube-powered background videos on the site.
 *
 * HERO BACKGROUND:       #banner-video-background  → rvdLSPFIZmU
 * TESTIMONIAL BACKGROUND: #testimonial-video-background → fOTgmsqMnQA
 *
 * To change a background video, update the videoId value below.
 * Zero page-weight cost: videos are streamed from YouTube's CDN.
 * All backgrounds are muted, looped, and autoplay — no controls shown.
 */

(function () {
  "use strict";

  /* ─── Configuration ─────────────────────────────────────────── */
  var BACKGROUNDS = [
    {
      containerId: "banner-video-background",
      videoId: "rvdLSPFIZmU",   // Hero section — Video Colorado showreel
    },
    {
      containerId: "testimonial-video-background",
      videoId: "fOTgmsqMnQA",   // Testimonial section background
    },
  ];

  /* ─── YouTube IFrame API loader ──────────────────────────────── */
  var players = {};
  var apiReady = false;
  var pendingInits = [];

  function loadYouTubeAPI() {
    if (document.getElementById("yt-iframe-api")) return;
    var tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(tag, firstScript);
  }

  /* Called by YouTube after the API script loads */
  window.onYouTubeIframeAPIReady = function () {
    apiReady = true;
    pendingInits.forEach(function (fn) { fn(); });
    pendingInits = [];
  };

  /* ─── Player factory ─────────────────────────────────────────── */
  function createBackgroundPlayer(config) {
    var container = document.getElementById(config.containerId);
    if (!container) return; // element not on this page — skip

    function init() {
      players[config.containerId] = new YT.Player(config.containerId, {
        videoId: config.videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playlist: config.videoId, // required for loop to work
          playsinline: 1,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: function (e) {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: function (e) {
            /* Keep playing if paused or ended */
            if (
              e.data === YT.PlayerState.PAUSED ||
              e.data === YT.PlayerState.ENDED
            ) {
              e.target.playVideo();
            }
          },
        },
      });
    }

    if (apiReady) {
      init();
    } else {
      pendingInits.push(init);
    }
  }

  /* ─── Service video backgrounds (accordion clips) ───────────── */
  /* These use data-video-id + data-start/data-end for looping clips */
  function initServiceVideos() {
    var serviceVideos = document.querySelectorAll(".service-video-bg[data-video-id]");
    serviceVideos.forEach(function (el) {
      var videoId = el.getAttribute("data-video-id");
      var start   = parseInt(el.getAttribute("data-start") || "0", 10);
      var end     = parseInt(el.getAttribute("data-end")   || "30", 10);
      var elId    = el.id;
      if (!elId || !videoId) return;

      function initServicePlayer() {
        new YT.Player(elId, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            start: start,
            end: end,
            loop: 1,
            playlist: videoId,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onReady: function (e) {
              e.target.mute();
              e.target.playVideo();
            },
            onStateChange: function (e) {
              if (e.data === YT.PlayerState.ENDED) {
                e.target.seekTo(start);
                e.target.playVideo();
              }
            },
          },
        });
      }

      if (apiReady) {
        initServicePlayer();
      } else {
        pendingInits.push(initServicePlayer);
      }
    });
  }

  /* ─── Project section thumbnail backgrounds ──────────────────── */
  function initProjectVideos() {
    var projectVideos = document.querySelectorAll(".project-video-bg[data-video-id]");
    projectVideos.forEach(function (el) {
      var videoId = el.getAttribute("data-video-id");
      var elId    = el.id;
      if (!elId || !videoId) return;

      function initProjectPlayer() {
        new YT.Player(elId, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            playlist: videoId,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onReady: function (e) {
              e.target.mute();
              e.target.playVideo();
            },
          },
        });
      }

      if (apiReady) {
        initProjectPlayer();
      } else {
        pendingInits.push(initProjectPlayer);
      }
    });
  }

  /* ─── Modal video (play button click) ───────────────────────── */
  function initModalVideo() {
    var overlay    = document.getElementById("modal-overlay");
    var videoFrame = document.getElementById("my-video-frame");
    var closeBtn   = overlay ? overlay.querySelector(".my-close") : null;

    if (!overlay || !videoFrame) return;

    document.querySelectorAll(".request-loader").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-video");
        if (!src) return;
        videoFrame.src = src;
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      overlay.classList.remove("active");
      videoFrame.src = "";
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ─── CTA highlight section background ──────────────────────── */
  function initCTAHighlight() {
    var ctaVideos = document.querySelectorAll(".cta-highlight-video[data-video-id]");
    ctaVideos.forEach(function (el) {
      var videoId = el.getAttribute("data-video-id");
      if (!videoId) return;

      function initCTAPlayer() {
        new YT.Player(el, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            playlist: videoId,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onReady: function (e) {
              e.target.mute();
              e.target.playVideo();
            },
          },
        });
      }

      if (apiReady) {
        initCTAPlayer();
      } else {
        pendingInits.push(initCTAPlayer);
      }
    });
  }

  /* ─── Boot ───────────────────────────────────────────────────── */
  function boot() {
    loadYouTubeAPI();

    /* Main background players */
    BACKGROUNDS.forEach(createBackgroundPlayer);

    /* Section-specific players */
    initServiceVideos();
    initProjectVideos();
    initModalVideo();
    initCTAHighlight();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
