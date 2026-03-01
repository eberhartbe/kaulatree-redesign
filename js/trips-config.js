// =============================================
// TRIPS CONFIGURATION
// Edit the values below to update trips content
// across the entire website (homepage + trips page).
//
// QUICK GUIDE:
// - To hide the upcoming trip: set hasUpcomingTrip to false
// - To change the featured video: update featuredVideo below
// - To add a past trip: add it to the correct year in pastTrips
// =============================================

const TRIPS_CONFIG = {

  // ---- UPCOMING TRIP TOGGLE ----
  // Set to true when there is an upcoming trip to promote.
  // Set to false to show the featured video on the homepage instead.
  hasUpcomingTrip: true,

  // ---- UPCOMING TRIP DETAILS ----
  // Only displayed when hasUpcomingTrip is true.
  upcomingTrip: {
    name: "Sweden & Finland",
    date: "SPRING 2026",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1600&q=90",
    imageAlt: "Sweden and Finland Ministry Trip",
    description: "Join us as we travel to Sweden and Finland to strengthen and encourage communities through prophetic ministry and hands-on training.",
    highlights: [
      "Prophetic ministry and prayer",
      "Community outreach and service",
      "Team worship and fellowship"
    ],
    donateUrl: "https://pushpay.com/g/kaulatree",
    contactUrl: "contact/"
  },

  // ---- FEATURED VIDEO FALLBACK ----
  // Shown on the homepage when hasUpcomingTrip is false.
  // Replace videoId with any YouTube video ID.
  featuredVideo: {
    videoId: "JaP3VzaEG80",
    thumbnailImage: "images/waterfall.jpg",
    thumbnailAlt: "Ministry Trip Recap",
    tripName: "Sweden 2025",
    description: "Watch highlights from our most recent ministry trip to Sweden, where we saw God move powerfully through prophetic ministry and training."
  },

  // ---- PAST TRIPS ----
  // Grouped by year. Each trip has a name and an optional videoId.
  // Leave videoId as "" if no recap video exists for that trip.
  pastTrips: [
    {
      year: 2026,
      recapUrl: "",
      trips: [
        { name: "New York" }
      ]
    },
    {
      year: 2025,
      recapUrl: "https://youtu.be/bSaCvICpwEs",
      trips: [
        { name: "California" },
        { name: "Georgia" },
        { name: "Indonesia" },
        { name: "Malaysia" },
        { name: "Middle East" },
        { name: "Sweden" },
        { name: "Tennessee" }
      ]
    },
    {
      year: 2024,
      recapUrl: "https://youtu.be/nFxGA0qnLJU",
      trips: [
        { name: "Canada" },
        { name: "Finland" },
        { name: "Malawi" },
        { name: "Middle East" },
        { name: "Sweden" },
        { name: "Tennessee" }
      ]
    },
    {
      year: 2023,
      recapUrl: "https://youtu.be/zcvLJXcXyR0",
      trips: [
        { name: "Finland" },
        { name: "Malawi" },
        { name: "Middle East" },
        { name: "South Africa" },
        { name: "Sweden" },
        { name: "Tennessee" }
      ]
    }
  ]
};
