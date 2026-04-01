

# World Clock Web App

## Overview
A cinematic, bold world clock app matching the reference image's hero-style design — large digital time display, city photography, and secondary timezone strip.

## Layout & Visual Design (matching reference)
- **Top bar**: "WORLD TIME" logo/text (left), settings gear + add city button (right)
- **Hero clock section**: Massive digital time display with blocky/bold font showing hours : minutes : seconds, with labels above each unit — light/off-white background
- **Secondary cities strip**: Row of up to 5 city times below the main clock
- **City photo section**: Full-width cinematic image of the primary city with overlay showing city name, country, day of week, and date
- **Dark mode**: Inverted color scheme preserving the same bold feel

## Features

### 1. City Management
- First city added becomes the primary (hero) clock
- Up to 5 cities total, no duplicates
- Click secondary city → promotes to primary with smooth transition
- Remove any city; if primary removed, next city auto-promotes
- Empty state with prompt to add first city

### 2. Add City
- Top-right "+" button opens a search modal/panel
- Search input with city/country suggestions (using a built-in timezone city list from Intl API)
- Select to add; modal closes

### 3. Settings Panel
- Gear icon opens small dropdown/panel
- Dark/light mode toggle
- 12h/24h format toggle
- Settings persist in localStorage

### 4. Time Display
- Real timezone data via `Intl.DateTimeFormat` with IANA timezone identifiers
- Live update every second
- Large blocky digital font (using a web font like "Share Tech Mono" or similar bold digital style)

### 5. City Images
- Fetch from Unsplash Source/API for the primary city
- Loading skeleton while fetching
- Fallback gradient/placeholder on failure
- Image updates on primary city change

### 6. Responsive
- Desktop: full hero layout as in reference
- Mobile: stacked layout, scaled-down clock, scrollable secondary cities

## Tech
- React + TypeScript + Tailwind
- localStorage for persisted cities and settings
- Intl API for timezone handling
- Unsplash for city images (free source URLs, no API key needed)

