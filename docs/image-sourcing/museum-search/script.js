// Museum collection search URLs and configurations
const museums = [
    {
        name: "Art Institute of Chicago",
        shortName: "AIC",
        description: "Public domain artworks collection",
        baseUrl: "https://www.artic.edu/collection",
        searchParam: "q",
        publicDomainFilter: "is_public_domain=1",
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            }
            return url;
        }
    },
    {
        name: "Metropolitan Museum of Art",
        shortName: "Met",
        description: "Open access collection with high-resolution images",
        baseUrl: "https://www.metmuseum.org/art/collection/search",
        searchParam: "q",
        publicDomainFilter: "showOnly=openAccess",
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            }
            return url;
        }
    },
    {
        name: "Getty Research Institute",
        shortName: "Getty",
        description: "Research-quality images and historical documentation",
        baseUrl: "https://search.getty.edu/gateway/search",
        searchParam: "q",
        publicDomainFilter: 'highlights="Open Content Images"',
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}&cat=source&r="GRI+Digital+Collections"&sources="GRI Digital Collections"`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            }
            return url;
        }
    },
    {
        name: "National Gallery of Art",
        shortName: "NGA",
        description: "Downloadable high-resolution images",
        baseUrl: "https://www.nga.gov/artwork-search",
        searchParam: "q",
        publicDomainFilter: "download=1",
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            }
            return url;
        }
    },
    {
        name: "Smithsonian Institution",
        shortName: "Smithsonian",
        description: "Millions of images across multiple museums",
        baseUrl: "https://www.si.edu/search/collection-images",
        searchParam: "q",
        publicDomainFilter: "cc0=true",
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            }
            return url;
        }
    },
    {
        name: "Cleveland Museum of Art",
        shortName: "Cleveland",
        description: "Diverse collection with cultural representation",
        baseUrl: "https://www.clevelandart.org/art/collection/search",
        searchParam: "search",
        publicDomainFilter: "only_open_access=1",
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            }
            return url;
        }
    },
    {
        name: "Public Domain Review",
        shortName: "PDR",
        description: "Curated collections with contextual essays",
        baseUrl: "https://publicdomainreview.org/search",
        searchParam: "q",
        publicDomainFilter: "",
        buildUrl: function(query, publicDomainOnly) {
            return `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
        }
    },
    {
        name: "Newfields Collections",
        shortName: "Newfields",
        description: "Indianapolis Museum of Art with advanced search",
        baseUrl: "https://collections.discovernewfields.org/search",
        searchParam: "searchTerm",
        publicDomainFilter: "showOnly=is_public_domain&showOnly=is_open_access&section=artworks",
        buildUrl: function(query, publicDomainOnly) {
            let url = `${this.baseUrl}?${this.searchParam}=${encodeURIComponent(query)}`;
            if (publicDomainOnly) {
                url += `&${this.publicDomainFilter}`;
            } else {
                url += "&section=artworks";
            }
            return url;
        }
    },
    {
        name: "Los Angeles County Museum of Art",
        shortName: "LACMA",
        description: "Contemporary and international art representation",
        baseUrl: "https://collections.lacma.org/search/site",
        searchParam: "search",
        publicDomainFilter: "",
        buildUrl: function(query, publicDomainOnly) {
            return `${this.baseUrl}/${encodeURIComponent(query)}`;
        }
    }
];

// DOM elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const museumGrid = document.getElementById('museumGrid');
const resultsStats = document.getElementById('resultsStats');
const openNewTabsCheckbox = document.getElementById('openNewTabs');
const publicDomainOnlyCheckbox = document.getElementById('publicDomainOnly');

// Search functionality
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
});

function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    const openNewTabs = openNewTabsCheckbox.checked;
    const publicDomainOnly = publicDomainOnlyCheckbox.checked;

    // Show results container and loading indicator
    resultsContainer.style.display = 'block';
    loadingIndicator.style.display = 'block';
    museumGrid.style.display = 'none';

    // Update stats
    resultsStats.textContent = `Searching for "${query}" across ${museums.length} collections...`;

    // Disable search button temporarily
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';

    // Generate search URLs and open them
    const searchUrls = museums.map(museum => ({
        museum: museum,
        url: museum.buildUrl(query, publicDomainOnly)
    }));

    if (openNewTabs) {
        // Open all searches in new tabs
        searchUrls.forEach(({museum, url}) => {
            window.open(url, '_blank');
        });
        
        // Show completion message after a short delay
        setTimeout(() => {
            showSearchResults(query, searchUrls);
        }, 1000);
    } else {
        // Show results with links to click
        showSearchResults(query, searchUrls);
    }
}

function showSearchResults(query, searchUrls) {
    loadingIndicator.style.display = 'none';
    museumGrid.style.display = 'grid';
    
    // Update stats
    resultsStats.textContent = `Search results for "${query}" - ${museums.length} collections`;
    
    // Clear previous results
    museumGrid.innerHTML = '';
    
    // Create museum cards
    searchUrls.forEach(({museum, url}) => {
        const card = createMuseumCard(museum, url, query);
        museumGrid.appendChild(card);
    });
    
    // Re-enable search button
    searchBtn.disabled = false;
    searchBtn.textContent = 'Search All Collections';
}

function createMuseumCard(museum, searchUrl, query) {
    const card = document.createElement('div');
    card.className = 'museum-card';
    
    card.innerHTML = `
        <div class="museum-name">${museum.name}</div>
        <div class="museum-description">${museum.description}</div>
        <a href="${searchUrl}" target="_blank" class="search-link">
            Search "${query}" at ${museum.shortName}
        </a>
    `;
    
    return card;
}

// Auto-focus search input on page load
window.addEventListener('load', function() {
    searchInput.focus();
});

// Handle Enter key in search input
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
    }
});

// Add some example searches for demonstration
const exampleQueries = [
    'Van Gogh',
    'Rembrandt drawings',
    'Japanese woodblock',
    'portrait sketches',
    'landscape drawings'
];

// Add placeholder rotation
let placeholderIndex = 0;
function rotatePlaceholder() {
    if (document.activeElement !== searchInput) {
        searchInput.placeholder = `Try searching: "${exampleQueries[placeholderIndex]}"`;
        placeholderIndex = (placeholderIndex + 1) % exampleQueries.length;
    }
}

// Rotate placeholder every 3 seconds
setInterval(rotatePlaceholder, 3000);
