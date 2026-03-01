// =============================================
// TRIPS RENDERER
// Reads TRIPS_CONFIG and populates the DOM.
// Works on both the homepage and trips page.
// =============================================

(function () {
  if (typeof TRIPS_CONFIG === 'undefined') return;

  var config = TRIPS_CONFIG;
  var isHomepage = !!document.getElementById('trips-upcoming');
  var isTripsPage = !!document.getElementById('trips-upcoming-section');

  // ---- HOMEPAGE ----
  if (isHomepage) {
    if (config.hasUpcomingTrip && config.upcomingTrip) {
      var trip = config.upcomingTrip;
      document.getElementById('trip-hero-img').src = trip.image;
      document.getElementById('trip-hero-img').alt = trip.imageAlt;
      document.getElementById('trip-hero-date').textContent = trip.date;
      document.getElementById('trip-hero-name').textContent = trip.name;
      document.getElementById('trip-hero-desc').textContent = trip.description;
      document.getElementById('trip-hero-donate').href = trip.donateUrl;
      document.getElementById('trips-upcoming').style.display = '';
    } else {
      var video = config.featuredVideo;
      document.getElementById('tripVideoTrigger').dataset.videoId = video.videoId;
      document.getElementById('trip-video-thumb').src = video.thumbnailImage;
      document.getElementById('trip-video-thumb').alt = video.thumbnailAlt;
      document.getElementById('trip-video-name').textContent = video.tripName;
      document.getElementById('trip-video-desc').textContent = video.description;
      document.getElementById('trips-fallback').style.display = '';

      // Bind the video trigger to the existing modal
      var trigger = document.getElementById('tripVideoTrigger');
      if (trigger) {
        trigger.addEventListener('click', function () {
          openVideoModal(this.dataset.videoId);
        });
      }
    }
  }

  // ---- TRIPS PAGE ----
  if (isTripsPage) {
    // Upcoming trip
    if (config.hasUpcomingTrip && config.upcomingTrip) {
      var section = document.getElementById('trips-upcoming-section');
      var grid = document.getElementById('trips-page-upcoming');
      var t = config.upcomingTrip;

      var highlightsHtml = '';
      if (t.highlights && t.highlights.length) {
        highlightsHtml = '<ul class="trip-detail-list">' +
          t.highlights.map(function (h) { return '<li>' + h + '</li>'; }).join('') +
          '</ul>';
      }

      grid.innerHTML =
        '<div class="trip-page-hero" data-animate="fade-up">' +
          '<div class="trip-page-hero-image">' +
            '<img src="' + t.image + '" alt="' + t.imageAlt + '">' +
            '<div class="trip-date">' + t.date + '</div>' +
          '</div>' +
          '<div class="trip-page-hero-content">' +
            '<h3 class="trip-title">' + t.name + '</h3>' +
            '<p class="trip-desc">' + t.description + '</p>' +
            highlightsHtml +
            '<div class="trip-actions">' +
              '<a href="' + t.donateUrl + '" target="_blank" rel="noopener" class="btn btn-primary">Donate <span class="arrow">&rarr;</span></a>' +
            '</div>' +
          '</div>' +
        '</div>';

      section.style.display = '';
    }

    // Past trips — inline list per year
    var pastContainer = document.getElementById('past-trips-container');
    if (pastContainer && config.pastTrips) {
      var html = '';

      config.pastTrips.forEach(function (yearGroup, groupIndex) {
        html += '<div class="past-trips-year-row" data-animate="fade-up" data-delay="' + (groupIndex * 0.05) + '">';
        html += '<h3 class="past-trips-year-heading">' + yearGroup.year + '</h3>';
        html += '<div class="past-trips-places">';

        yearGroup.trips.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (trip, i) {
          if (i > 0) html += '<span class="past-trips-sep">/</span>';
          html += '<span class="past-trip-name">' + trip.name + '</span>';
        });

        html += '</div>';

        if (yearGroup.recapUrl) {
          html += '<a href="' + yearGroup.recapUrl + '" target="_blank" rel="noopener" class="past-trips-recap-btn">';
          html += '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="5,3 19,12 5,21"/></svg>';
          html += ' Recap';
          html += '</a>';
        }

        html += '</div>';
      });

      pastContainer.innerHTML = html;
    }

  }

  // ---- VIDEO MODAL HELPERS ----

  function openVideoModal(videoId) {
    var modal = document.getElementById('videoModal');
    var iframe = document.getElementById('videoIframe');
    if (!modal || !iframe || !videoId) return;

    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    var modal = document.getElementById('videoModal');
    var iframe = document.getElementById('videoIframe');
    if (iframe) iframe.src = '';
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Set up modal close handlers on trips page
  // (homepage already has these via animations.js)
  if (isTripsPage) {
    var closeBtn = document.getElementById('videoClose');
    var backdrop = document.getElementById('videoModalBackdrop');
    var modal = document.getElementById('videoModal');

    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
    if (backdrop) backdrop.addEventListener('click', closeVideoModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }

})();
