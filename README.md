<p align="center"> <img src="https://github.com/Rudesind/obsidian-publish-znybo/blob/main/site_resources/logo_white_black_bg_1920.png?raw=true" alt="Logo" width="50%"> </p>

Configuration for my [Obsidian Publish](https://obsidian.md/publish) site: https://znybo.com.

## Credits
---
- Powered by [Obsidian Publish](https://obsidian.md/publish).
- Icons from [Font Awesome](https://fontawesome.com/) and [Lucide.dev](https://lucide.dev/).
- Gruvbox theme by [Minimal Publish](https://github.com/kepano/obsidian-minimal-publish).
- Maps powered by [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/copyright).
- CSS Snippets:
	- Cards by [Minimal](https://minimal.guide/cards).
	- Banner images from [Bluemoondragon07](https://forum.obsidian.md/t/banner-images-icons-experimental-more-image-options-css-snippet/53738).
	- Embed Adjustments by [SIRvb](https://publish.obsidian.md/slrvb-docs/ITS+Theme/Embed+Adjustments).
	- Outlined callout by [Kepano, sailKite and r-u-s-h-i-k-e-s-h](https://github.com/r-u-s-h-i-k-e-s-h/Obsidian-CSS-Snippets/blob/Collection/Snippets/Callout%20styling%20-%20Outlined%20callout.md).
	-  Modular CSS Layout by [efemkay](https://github.com/efemkay/obsidian-modular-css-layout).
- Fonts:
	- [Oswald](https://fonts.google.com/specimen/Oswald)
- Logo, pictures and other site resources by me.


## Installation and Setup
---
Setup and use of both my `publish.css` and `publish.js` is pretty simple, just copy both files and place them in the root of your **Obsidian Publish** vault.

> [!note]
> Using `publish.js` requires the use of a custom domain. To use all features of my site, you'll need to acquire and setup a custom domain as seen in the [official product documentation](https://help.obsidian.md/Obsidian+Publish/Set+up+a+custom+domain).

## Font Awesome
---
I utilize the free version of [Font Awesome](https://fontawesome.com/account/general) with a [Kit](https://docs.fontawesome.com/v5/web/use-with/wordpress/install-manually/#cdn-vs-kit). As I understand it, version 6+ of **Font Awesome** is only available via a free **Kit** or their **Pro CDN**. Older versions of **Font Awesome** can still be used (versions 4 and 5) via publicly hosted [CDN](https://cdnjs.com/libraries/font-awesome/6.6.0), but note that your millage with those may vary.

> [!note]
> If you still wish to use a free CDN option, see [here](https://www.w3schools.com/icons/fontawesome_icons_intro.asp) for some setup instructions.

**Font Awesome Free** gives you access to all free icons, 10,000 pages view, and use with one domain. For smaller personal projects this is more than enough.

### Setup
I use JavaScript to initialize **Font Awesome**, so a custom domain is required.

> [!note]
> It may be possible to use **Font Awesome** with only CSS and a CDN by adding the following line to your `publish.css` file:
> 
> `@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');`
>
> However I have not tested this method. [Source](https://stackoverflow.com/questions/37460680/how-to-add-font-awesome-in-css).

To use a **Kit**, you'll need to add the following element to the `<head>` of your site:

```html
<script src="https://kit.fontawesome.com/<kit>.js" crossorigin="anonymous"></script>
```

You will need to replace `<kit>` with the one provided to you by **Font Awesome**.

> [!note]
> If you copy my `publish.js` directly and try to run it, note that **Font Awesome** will not work. The **Kit** is specific to my domain and will not run anywhere else.

Since we don't have access to any HTML for our publish site, we have to inject this element using our `publish.js` file:

```javascript
var scriptElement = document.createElement('script');

scriptElement.setAttribute('src', 'https://kit.fontawesome.com/<kit>.js');
scriptElement.setAttribute('crossorigin', 'anonymous');

document.head.appendChild(scriptElement);
```

Thats it! We can now start using **Font Awesome**.

### Use
To use **Font Awesome**, simply navigate to any [icon](https://fontawesome.com/icons) on their site and copy the HTML:

```html
<i class="fa-solid fa-font-awesome"></i>
```

This element can be placed anywhere and it will add that icon to the page. Further styling can be achieved using CSS. 

You can also add the **Font Awesome** class to other elements. For example, if you want to make an icon a clickable link:

```html
<a class="fa-brands fa-google"  href="https://www.google.com" target="_blank"></a>
```

This HTML can be injected in your `publish.js` file (not recommended), or placed directly in one of your Markdown notes (recommend).

> [!note]
> If you add the HTML to your note, preview mode will hide the HTML, so you will need to use **source** mode to view it. Additionally, the HTML will only render once it is pushed to your site.

#### CSS Pseudo Elements and Styling
It is also possible to add icons using [CSS Pseudo Elements](https://docs.fontawesome.com/web/add-icons/pseudo-elements). In my experience this option is best if you wish to style your site with icons, such as permanently adding them to a header, etc. Creating clickable links or other use cases may not work with this method.

In this example we add a capital "H" before all `h1` headings:

```css
.markdown-preview-view h1::before, {
	font-family: 'Font Awesome 6 Free';
	content: '\f1dc';
}
```

At a minimum you must provide the `font-family` and `content` for this to work. Icons are expected as unicode which is available on the **Font Awesome** site. Other styling options (such as color) can be added as desired.

## Leafletjs
---
While I haven't fully implemented [Leafletjs](https://leafletjs.com/), I did take some time to see if it was possible, and boy it is finicky.

Unfortunately I don't have a live example of this at the moment.

> [!note]
> Implementing maps utilizes JavaScript, and since [Obsidian sanitizes](https://help.obsidian.md/Editing+and+formatting/HTML+content) HTML in notes, a custom domain with a `publish.js` file is required.

### Setup
First, I recommend you read through the [Leaflet Quick Start Guide](https://leafletjs.com/examples/quick-start/), specifically the **Preparing your page**  and **Setting up the map** sections.

You will need to add both the CSS and JavaScript file to the `<head>` of your Obsidian site. Here are both the elements:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>

<!-- Make sure you put this AFTER Leaflet's CSS --> <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
```

This can be added to a `publish.js` file in the following format:

```javascript
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
```

Next you can specify where you want your map by adding `<div id="map"></div>` to any note in your vault.

Now we need to create the map, and this is where things get a little tricky. While the `leaflet.js` file was included in our `<head>` element, it takes a little bit to load. If we attempt to build the map immediately the `L` leaflet object won't be recognized. Instead we have to wait until the object becomes available. Here is the full code:

```javascript
var buildMap = document.createElement('script');

buildMap.innerHTML = `

	var leafletInterval = setInterval(function () {
		if (window.L) {
		
			clearInterval(leafletInterval);
			
  
		var map = L.map('map').setView([51.505, -0.09], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
			maxZoom: 19, 
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

		}
	}, 100); // Check every 100ms
`;

document.body.appendChild(buildMap);
```

The above code is appended to the bottom of the `<body>` element, and continuously runs until the `L` object is available. This should create a map at any element with the `map` ID.

There might be a better way of implementing this, but after hours of testing this was the only solution that worked. For example, it might be suggested to wait for the DOM to fully load by listening for the `DOMContentLoaded` event, but this never worked. The issue appears to be with how **Obsidian Publish** loads and processes `publish.js`, causing the above code to run before the `leaflet.js` file was loaded.

## Themes
---
Adding a theme to an **Obsidian Publish** requires you to add the CSS to your `publish.css` file. Personally I recommend using the [Minimal Publish Themes](https://github.com/kepano/obsidian-minimal-publish), which are publish versions of the popular [Minimal Theme](https://github.com/kepano/obsidian-minimal). These include most of **Minimals** features with a few exceptions (`embed-strict` doesn't seem to work for example).

## CSS and Snippets
---
To many, **Obsidian** is best when it is left simple with a minimal amount of modifications; however, there is also a large community dedicated to hacking the heck out of it.

Personally I tend to be a bit more minimal with my notes, but with a website I want it to be a little more stylish. Unfortunately because we have limited access to modify the site (and no plugin support), it can be challenging to find CSS that works as expected. To that end, the CSS I include in my site might not always be the best implementation of a solution, but it's what worked for me.

For more information on my snippets and how they are used, please see my [obsidian-snippets repo](https://github.com/Rudesind/obsidian-snippets/tree/main).
















