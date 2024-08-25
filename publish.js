/**
 * .___  ________  __________  ________  ___.
 * |   \ \       \ \        / /       / /   |
 * |    \ \       \ \      / /_______/ /    |
 * |     \ \       \ \    / ________  /     |
 * |      \ \       \ \  / /       / /      |
 * |_______\ \_______\ \/ /_______/ /_______|
 *
 * My primary publish script for Obsidian.
 * 
 */

/* === FONTS === */

// Insert a new attribute for so Font Awesome can be used.
// More info on using Font Awesome: https://www.w3schools.com/icons/fontawesome_icons_intro.asp
// Note that I built my own Font Awesome Kit for hosting these.
//
var scriptElement = document.createElement('script');

scriptElement.setAttribute('src', 'https://kit.fontawesome.com/df48cc8888.js');
scriptElement.setAttribute('crossorigin', 'anonymous');

document.head.appendChild(scriptElement);

/* === LEAFLET MAPS === */

/**
 * This section is for initalizing and creating custom maps on my blog.
 * 
 * For a complete step by step guide, see the following:
 * 
 * https://leafletjs.com/examples/quick-start/
 * 
 * To place the map, you will need to put the div element for the map in the 
 * actual MD file.
 */

/* Uncomment to use maps
var mapStyleSheet = document.createElement('link'),
    mapScript = document.createElement('script');

mapStyleSheet.rel = 'stylesheet';
mapStyleSheet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
mapStyleSheet.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
mapStyleSheet.crossOrigin = '';

mapScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
mapScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
mapScript.crossOrigin = '';

document.head.appendChild(mapStyleSheet);
document.head.appendChild(mapScript);
*/

/**
 * While the above section follows the Leaflet setup guide, the below was a 
 * little bit of trail and error with thelp of ChatGPT. I had to troubleshoot
 * a little to figure out how to get the leaflet library to load correctly.
 * 
 * Basically, I kept getting errors where "L" was not defined. I believe this
 * was happening because the library hadn't loaded when the script executed.
 * Waiting for the DOM to load didn't work nor did waiting for the window to 
 * load.
 * 
 * Instead, I opted to wait for the library to load. While this might not be 
 * the best solution, it works!
 * 
 * Note however, that this method prevents passwords from working on the site.
 * Not sure why that is, but I think it has to do with how the publish.js
 * file is loaded when a password is present.
 */

/* Uncomment to use maps
var buildMap = document.createElement('script');

buildMap.innerHTML = `
    var leafletInterval = setInterval(function () {

        if (window.L) { // This will be null if the leaflet library hasn't loaded.

            clearInterval(leafletInterval);

            // Map is built below this line.

            var maxBounds = L.latLngBounds(
                L.latLng(-124.73364306703067, 45.54383071539715), //Southwest
                L.latLng(-116.915989, 49.002494)  //Northeast
            );

            var map = L.map('map', {
                zoomDelta: 0.25,
                zoomSnap: 0
            }).fitBounds(maxBounds);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
            }).addTo(map);

            var marker = L.marker([47.423458, -120.310349]).addTo(map);

            marker.bindPopup("<b>Hello world!</b><br>This is Seattle.").openPopup();
        }

    }, 100); // Check every 100ms
`;

document.body.appendChild(buildMap);
*/

/* === BACKGROUND IMAGE === */

/* Uncomment to use background
var backgroundImg = document.createElement('img'),
    markdownView = document.querySelector("body > div > div.site-body > div.site-body-center-column > div.render-container > div.render-container-inner > div > div.markdown-preview-view.markdown-rendered.node-insert-event.obsidian-banner")

backgroundImg.src = 'background.svg';

document.querySelector("body > div > div.site-body > div.site-body-center-column > div.render-container > div.render-container-inner > div > div.markdown-preview-view.markdown-rendered.node-insert-event.obsidian-banner").appendChild(backgroundImg);
*/

/* === MINIMAL PUBLISH === */

let imagesByPath = {};
let currentImageIndex = 0;
let currentPath = '';

function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

function preloadAllImages() {
    const images = imagesByPath[currentPath] || [];
    images.forEach(image => {
        const imgElement = image.querySelector('img');
        const imageUrl = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src');
        if (imageUrl) {
            preloadImage(imageUrl);
        }
    });
}

function updateCurrentPath() {
    currentPath = publish.currentFilepath;
    if (!imagesByPath[currentPath]) {
        imagesByPath[currentPath] = [];
        preloadAllImages();
    }
}

publish.registerMarkdownPostProcessor(async (el, ctx) => {
    updateCurrentPath();

    const blockImages = Array.from(el.querySelectorAll('.internal-embed')).filter(span => /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(span.getAttribute('src')));
    blockImages.forEach((span) => {
        if (!span.classList.contains('processed')) {
            span.classList.add('processed');
            imagesByPath[currentPath].push(span);

            span.addEventListener('click', function () {
                currentImageIndex = imagesByPath[currentPath].indexOf(this);
                const lightboxDiv = document.createElement('div');
                lightboxDiv.classList.add('lightbox');
                const contentToMove = this.cloneNode(true);
                lightboxDiv.appendChild(contentToMove);
                document.body.appendChild(lightboxDiv);

                let startX;
                lightboxDiv.addEventListener('touchstart', e => {
                    startX = e.touches[0].clientX;
                });

                lightboxDiv.addEventListener('touchend', e => {
                    const endX = e.changedTouches[0].clientX;
                    if (startX - endX > 50) {
                        // Swipe left
                        currentImageIndex = (currentImageIndex + 1) % imagesByPath[currentPath].length;
                    } else if (startX - endX < -50) {
                        // Swipe right
                        currentImageIndex = (currentImageIndex - 1 + imagesByPath[currentPath].length) % imagesByPath[currentPath].length;
                    }
                    lightboxDiv.innerHTML = '';
                    const newContent = imagesByPath[currentPath][currentImageIndex].cloneNode(true);
                    lightboxDiv.appendChild(newContent);
                });

                const removeLightbox = () => {
                    document.body.removeChild(lightboxDiv);
                    document.removeEventListener('keydown', keyListener);
                };

                lightboxDiv.addEventListener('click', removeLightbox);

                const keyListener = (event) => {
                    const images = imagesByPath[currentPath] || [];
                    if (event.key === "Escape") {
                        removeLightbox();
                    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                        if (event.key === "ArrowRight") {
                            currentImageIndex = (currentImageIndex + 1) % images.length;
                        } else {
                            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                        }
                        lightboxDiv.innerHTML = '';
                        const newContent = images[currentImageIndex].cloneNode(true);
                        lightboxDiv.appendChild(newContent);
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                        event.preventDefault();
                    }
                };

                document.addEventListener('keydown', keyListener);
            });
        }
    });
});

/* === NAVIGATION PANE === */

// To simplify my blogging process for now, I've made no HTML changes to the 
// navigation pane. See CSS for any modifications.

// This section is a little touchy. All elements need to be considered here, 
// even folders. Removing present elements causes issues in the mobile HTML (
// from my testing). This means that this will need to be updated when new 
// files or folders are added to the site.
//
// Check this section if suddenly elements aren't rendering on mobile.
//
/*
var newNavigationPane = `
    <div class="nav-view">
        <div class="tree-item">
            <div class="tree-item-self mod-root is-clickable" data-path="">
                <div class="tree-item-inner"></div>
            </div>
            <div class="tree-item-children">
                <div class="tree-item is-collapsed">
                    <div class="tree-item-self is-clickable" data-path="blog entries">
                        <div class="tree-item-icon collapse-icon is-collapsed"><svg xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="svg-icon right-triangle">
                                <path d="M3 8L12 17L21 8"></path>
                            </svg></div>
                        <div class="tree-item-inner">blog entries</div>
                    </div>
                </div>
                <div class="tree-item"><a class="tree-item-self is-clickable" data-path="art.md"
                        href="https://znybo.com/art">
                        <div class="tree-item-inner fa-solid fa-palette"></div>
                    </a>
                    <div class="tree-item-children"></div>
                </div>
                <div class="tree-item"><a class="tree-item-self is-clickable" data-path="blog.md"
                        href="https://znybo.com/blog">
                        <div class="tree-item-inner">test</div>
                    </a>
                    <div class="tree-item-children"></div>
                </div>
                <div class="tree-item"><a class="tree-item-self is-clickable mod-active" data-path="home.md"
                        href="https://znybo.com/home">
                        <div class="tree-item-inner">home</div>
                    </a>
                    <div class="tree-item-children"></div>
                </div>
                <div class="tree-item"><a class="tree-item-self is-clickable" data-path="photography.md"
                        href="https://znybo.com/photography">
                        <div class="tree-item-inner">photography</div>
                    </a>
                    <div class="tree-item-children"></div>
                </div>
            </div>
        </div>
    </div>
`;

document.querySelector('body > div > div.site-body > div.site-body-left-column > div > div.nav-view-outer > div').outerHTML = newNavigationPane;
*/

/* === FOOTER === */

// Below is old code. I've decided to disable the footer all together.
// See the CSS for more details.
//
/*
var newFooterHTML = `
    <div class="site-footer">
        <div class="youtube-icon">
            <a href="https://www.youtube.com/@znybo" target="_blank" class="fa fa-youtube-play"></a>
        </div>
        <div class="insta-icon">
            <a href="https://www.instagram.com/sendimaor" target="_blank" class="fa fa-instagram"></a>
        </div>
    </div>
`;

document.querySelector('body > div > div.site-body > div.site-body-center-column > div.site-footer').innerHTML = newFooterHTML;
*/