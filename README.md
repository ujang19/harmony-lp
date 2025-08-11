# Harmony in Diversity Award

This is a refactor of the Harmony in Diversity Award landing page from a single HTML file to an Astro.js project.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Project Structure

- `/public/assets` - All static assets
- `/src/components` - Astro components for each section
- `/src/pages` - Page files (index.astro)
- `/src/styles` - Custom CSS styles

## Components

The page is composed of the following components:
- Header.astro
- Hero.astro
- KvBanner.astro (reusable component)
- About.astro
- Celebrates.astro
- Eligibility.astro
- RaiseAccordion.astro
- Participate.astro
- Timeline.astro
- AwardRecognition.astro
- Judges.astro
- Trophy.astro
- Partners.astro
- Faq.astro
- Footer.astro

## Features

- Responsive design with mobile menu toggle
- Interactive accordions for RAISE criteria and FAQ
- Custom color banners with layered backgrounds
- Overlap effects with negative margins
- Tailwind CSS with custom brand colors