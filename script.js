// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const locationDropdown = document.querySelector(".location-dropdown");
const locationDropdownMenu = document.getElementById("locationDropdownMenu");
const currentLocationSpan = document.getElementById("currentLocation");
const propertyTypeButtons = document.querySelectorAll(".property-type-btn");
const localityTags = document.querySelectorAll(".locality-tag");
const exploreButton = document.querySelector(".explore-btn");

// Enhanced State Management
const state = {
  currentLocation: "Warangal",
  currentPropertyType: "rent", // Default to rent
  isSearching: false,
  locations: ["Hyderabad", "Warangal", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"],
  propertyTypes: ["buy", "rent", "plots"],
  pageRedirects: {
    Warangal: {
      rent: {
        "Naimnagar": "WarangalRent.html",
        "Ku-cross": "WarangalRent.html",
        "Warangal": "WarangalRent.html",
        "Hanmakonda": "WarangalRent.html",
        "Kazipet": "WarangalRent.html"
      },
      buy: {
        "Naimnagar": "WarangalBuy.html",
        "Ku-cross": "WarangalBuy.html",
        "Warangal": "WarangalBuy.html",
        "Hanmakonda": "WarangalBuy.html",
        "Kazipet": "WarangalBuy.html"
      },
      plots: {
        "Naimnagar": "WarangalPlots.html",
        "Ku-cross": "WarangalPlots.html",
        "Warangal": "WarangalPlots.html",
        "Hanmakonda": "WarangalPlots.html",
        "Kazipet": "WarangalPlots.html"
      }
    },
    Hyderabad: {
      rent: {
        "Hyderabad": "HydRent.html",
        "kukatpally": "HydRent.html",
        "Ghatkesar": "HydRent.html",
        "Kukatpally": "HydRent.html",
        "Kompally": "HydRent.html",
        "Miyapur": "HydRent.html"
      },
      buy: {
        "Hyderabad": "HydBuy.html",
        "kukatpally": "HydBuy.html",
        "Ghatkesar": "HydBuy.html",
        "Kukatpally": "HydBuy.html",
        "Kompally": "HydBuy.html",
        "Miyapur": "HydBuy.html"
      },
      plots: {
        "Hyderabad": "HydPlots.html",
        "kukatpally": "HydPlots.html",
        "Ghatkesar": "HydPlots.html",
        "Kukatpally": "HydPlots.html",
        "Kompally": "HydPlots.html",
        "Miyapur": "HydPlots.html"
      }
    },
    Delhi: {
      rent: {
        "Delhi": "DelhiRent.html"
      },
      buy: {
        "Delhi": "DelhiBuy.html"
      },
      plots: {
        "Delhi": "DelhiPlots.html"
      }
    },
    Bangalore: {
      rent: {
        "Bangalore": "BangaloreRent.html"
      },
      buy: {
        "Bangalore": "BangaloreBuy.html"
      },
      plots: {
        "Bangalore": "BangalorePlots.html"
      }
    },
    Mumbai: {
      rent: {
        "Mumbai": "MumbaiRent.html"
      },
      buy: {
        "Mumbai": "MumbaiBuy.html"
      },
      plots: {
        "Mumbai": "MumbaiPlots.html"
      }
    }
  }
};

// Enhanced Search Functionality
function handleSearch() {
  if (state.isSearching) return;

  const searchQuery = searchInput.value.trim();
  
  // For Delhi, Bangalore, and Mumbai, allow search without locality
  const simpleCities = ["Delhi", "Bangalore", "Mumbai"];
  if (!searchQuery && !simpleCities.includes(state.currentLocation)) {
    alert("Please enter a locality to search");
    return;
  }

  state.isSearching = true;
  searchButton.classList.add("searching");

  // Get redirect URL based on current selection
  const redirectUrl = getRedirectUrl(state.currentLocation, searchQuery);
  
  setTimeout(() => {
    console.log(`Searching in ${state.currentLocation} for: ${searchQuery}`);
    console.log(`Property type: ${state.currentPropertyType}`);

    state.isSearching = false;
    searchButton.classList.remove("searching");

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert("Please select a valid location and locality combination.");
    }
  }, 1000);
}

// Helper function to get redirect URL
function getRedirectUrl(location, locality) {
  const locationPages = state.pageRedirects[location];
  if (!locationPages) return null;

  const propertyTypePages = locationPages[state.currentPropertyType];
  if (!propertyTypePages) return null;

  // For simplified cities, return default page if no locality specified
  if (["Delhi", "Bangalore", "Mumbai"].includes(location) && !locality) {
    return propertyTypePages[location];
  }

  return propertyTypePages[locality] || null;
}
// Location Dropdown Handling
function initializeLocationDropdown() {
  // Location dropdown toggle
  locationDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    locationDropdownMenu.classList.toggle("hidden");
  });

  // Handle location selection
  document.querySelectorAll(".location-option").forEach(option => {
    option.addEventListener("click", () => {
      const selectedLocation = option.dataset.location;
      currentLocationSpan.textContent = selectedLocation;
      state.currentLocation = selectedLocation;
      locationDropdownMenu.classList.add("hidden");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!locationDropdown.contains(e.target)) {
      locationDropdownMenu.classList.add("hidden");
    }
  });
}

// Enhanced Locality Tags Handling
function initializeLocalityTags() {
  const container = document.querySelector(".localities-container");

  localityTags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      // Prevent default redirect
      e.preventDefault();
      
      // Update search input with locality
      const locality = tag.textContent.replace("→", "").trim();
      searchInput.value = locality;
    });
  });

  // Scroll handling
  let isScrolling = false;
  let startX, scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isScrolling = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = "grabbing";
  });

  container.addEventListener("mousemove", (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener("mouseup", () => {
    isScrolling = false;
    container.style.cursor = "grab";
  });

  container.addEventListener("mouseleave", () => {
    isScrolling = false;
    container.style.cursor = "grab";
  });
}

// Property Type Selection
function handlePropertyTypeChange(propertyType) {
  console.log(`Switching to ${propertyType} properties`);
  state.currentPropertyType = propertyType;
  
  // Update UI
  propertyTypeButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.type === propertyType) {
      btn.classList.add("active");
    }
  });
}

// Scroll Animation for Header
function initializeScrollHeader() {
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && header.classList.contains("scroll-down")) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });
}

// Event Listeners Setup
function setupEventListeners() {
  searchButton.addEventListener("click", handleSearch);

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  propertyTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const propertyType = button.dataset.type;
      handlePropertyTypeChange(propertyType);
    });
  });

  
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeLocalityTags();
  initializeScrollHeader();
  initializeLocationDropdown();
  setupEventListeners();
});

// Set the target date for the countdown
const targetDate = new Date("2024-12-31T23:59:59").getTime();

// Update the countdown every second
const interval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        // If the countdown ends, show a message
        document.getElementById("countdown").innerHTML = "The event has started!";
        clearInterval(interval);
        return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById("countdown").innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);