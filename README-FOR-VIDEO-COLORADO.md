# Video Colorado Website — Structure & Launch Readiness

This pass took the rewritten template (content from the previous session) and
turned it into an honest, working information architecture: a clean nav with
only finished pages, no fabricated names or invented projects, and a clear
path for re-adding the pages that aren't ready yet.

## Live pages (in main nav)

Home, About, Services, Pricing, Contact. These are the five pages a visitor
can actually reach from the menu, and the only five listed in `sitemap.xml`.

## What changed this session

**Navigation was exposing template scaffolding.** The header dropdown menu
listed "Single Post," "404," "Service Detail," and "Project Details" as
clickable top-level items — none of those should ever be a menu choice. Nav
(desktop header, mobile sidebar, and footer) is now a flat five-item menu
across all pages.

**Service Detail was cut, not fixed.** There was exactly one detail page
("Video Production") but the Services accordion's "View Details" button
appeared next to all five services, so clicking it from "Bilingual &
Bicultural Communication" landed you on a page titled "Video Production."
Per your call, this tier is gone — `service-detail.html` was deleted and
every "View Details" button now goes straight to Contact ("Get a Quote").

**Fabricated names were removed.** The homepage testimonial carousel had
invented full names and a stock company ("Alex Morgan," "Marko Agency,"
"Jamie Carter," etc.) attached to quotes, alongside stock headshots — that's
materially different from an anonymized "Program Manager, Nonprofit
Organization" credit, and it's been pulled from both the homepage and
`testimonial.html`. What's left is the quote and the role, with no invented
person.

**The homepage "Selected Work" section claimed specific finished projects.**
Titles like "Community Voices," "Driven Forward," and "Building Trust," each
with its own category tag and a link into a project case-study page, read as
real completed client work. Since there's no real client video yet, this is
now framed honestly as "A Look at Our Style" with plain "Demo Reel" labels
and no links to a portfolio page that doesn't have real content behind it.

**Three pages were taken out of the live site, not deleted.** `team.html`
(only "Add Team Member" placeholder cards exist), `testimonial.html`, and
`blog.html` (ten good titles, zero written posts — every card said "Coming
Soon") are staged: removed from nav, marked `noindex` so Google won't crawl
half-finished pages, and excluded from the sitemap. The corresponding
homepage sections (Team, Blog) are commented out, not deleted — uncomment
once there's real content. `project.html` / `project-detail.html` got the
same treatment since the portfolio also needs real client video before it's
shown as a dedicated page.

**Logo and favicon were still the stock template's.** Every page was loading
`Montra-Logo.png` (the original template's brand) and a favicon link with an
invalid `rel="web icon"` attribute that wouldn't have worked in most
browsers anyway. The navbar/sidebar logo is now a text wordmark ("Video
Colorado" in your accent orange, `#F96500` — same hex as the Panamericana
Media manual) as a placeholder until a real Video Colorado logo file exists.
The favicon now uses the Panamericana "PM" mark from your brand assets,
resized properly, with a correct `rel="icon"` tag.

**A fake phone number was in the footer.** `(303) 555-0182` was never
flagged as a placeholder the way the `hello@videocolorado.com` inbox was —
it's been replaced with the real contact email on every page until you have
an actual number to publish.

**Added `robots.txt` and `sitemap.xml`** — neither existed. The sitemap
lists only the five live pages; `robots.txt` explicitly disallows the six
staged pages so they don't get indexed half-finished, and points to the
sitemap. Both currently assume the domain `videocolorado.com` — replace that
in both files once your real domain is confirmed.

## To re-enable a staged page

1. Add the real content (team bios, testimonial quotes, blog posts, or
   portfolio video).
2. Remove the `<meta name="robots" content="noindex, nofollow">` line from
   that page's `<head>`.
3. Add its link back into the header nav, mobile sidebar, and footer nav
   (same three blocks on every page — they're identical, so copy the
   pattern from any live link).
4. Uncomment the matching homepage section (Team or Blog) if applicable.
5. Add the URL to `sitemap.xml` and remove its `Disallow` line from
   `robots.txt`.

## Still blocking a real launch

- **No real photos, video, or client logos.** Every image on the site is
  still a stock placeholder. This is the biggest gap — a video production
  company's site is the weakest argument for itself when none of the visuals
  are real work.
- **PHP hosting required.** The contact and newsletter forms POST to
  `assets/php/submit-contact.php` and `submit-newsletter.php`, which need a
  host with PHP support (GoDaddy's standard hosting works; static hosts like
  Netlify/GitHub Pages without serverless functions won't run them).
- **Confirm the inbox.** Both PHP files send to `hello@videocolorado.com`
  with a `// TODO: confirm this is the correct inbox` comment — confirm or
  change before going live.
- **Domain placeholder.** `robots.txt` and `sitemap.xml` assume
  `videocolorado.com` — update if the real domain differs.
