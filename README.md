# WorkSphere Freelancing Marketplace

WorkSphere is a responsive, multi-page freelancing marketplace frontend built with HTML, CSS, and vanilla JavaScript. It brings the Week 1-8 assignment work into one connected demo for clients and freelancers.

## Run Locally

Python 3 is sufficient; there are no package installs or build step.

```powershell
cd "C:\Users\Mudassar\Desktop\Freelancing Marketplace Platform"
python -m http.server 8000
```

Open <http://localhost:8000/>. To stop the server, press `Ctrl+C` in its terminal.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page, categories, featured talent/services, and login/register demo |
| `marketplace.html` | Service, freelancer, and job discovery with search, filters, sorting, and favorites |
| `service-details.html` | Service information, seller profile links, contact, and create-order flow |
| `freelancer-profile.html` | Public freelancer details, services, reviews, and message link |
| `profile.html` | Edit profile, upload a profile photo, and manage services |
| `create-service.html` | Create a service listing |
| `jobs.html` | Search and filter posted jobs |
| `job-details.html` | Job information and proposal submission |
| `post-job.html` | Create a job listing |
| `my-proposals.html` | View or withdraw submitted proposals |
| `orders.html` | Project list, status filters, and client/freelancer views |
| `order-details.html` | Project milestones, submissions, client approval, and review handoff |
| `messages.html` | Conversations, chat, and unread-message indicators |
| `notifications.html` | Notification center and unread filters |
| `reviews.html` | Submit a rating/review and browse existing reviews |
| `favorites.html` | View and filter saved services and freelancers |
| `dashboard.html` | Freelancer/client dashboard with project, job, review, message, and favorite summaries |

## Main Interactions

- Marketplace search covers services, freelancers, and jobs. Filters include category, budget, rating, delivery time, and experience; sorting includes price, rating, popularity, and newest.
- Saved services and freelancers appear on the Favorites page and client dashboard.
- Service ordering creates a local project/order and opens its project details.
- Job submissions are saved as proposals and appear in My Proposals.
- Project details support role views, milestone updates, delivery submissions, and client completion/review flow.
- Messaging, notifications, and reviews are interactive. Direct messages can be opened from freelancer, service, and project pages.
- Forms include browser validation or page-specific validation feedback. Empty states are provided for key lists.

## Profile Photo

On Profile → Edit Profile, choose a photo with the browser file picker or provide an image URL. The selected image is resized to a maximum dimension of 512 pixels and converted to JPEG before being saved with the local profile. The file is not sent to a server. Browsers grant access only to the selected file through the picker; a website cannot request unrestricted device-storage permission.

## Local Data and Limitations

This is a frontend-only assignment. Demo changes are stored in the browser's `localStorage`, including the user profile, services, jobs, proposals, orders, favorites, conversations, notifications, and reviews. Data is specific to the browser and origin and is not shared with other users or devices. Clearing browser site data removes these demo changes.

There is no backend, authentication service, payment processing, escrow, remote messaging, or database connection. Login/register and payments are demonstration UI only. A production deployment would need a server/API, a database, real authentication and authorization, and secure file storage.

## Technology and Requirements

- HTML5, CSS3, and JavaScript; no framework or dependency installation is required.
- The provided assignment specifies these frontend technologies and does not require a database. `localStorage` is used for interactive browser demos, not as a production database.
- The assignment also asks for screenshots or a short video of the completed page; capture these separately if required for submission.

## Project Structure

- Root-level HTML files are the individual site pages.
- `css/styles.css` contains shared design tokens, components, page styles, and responsive rules.
- `js/data.js` contains sample data and local-storage helpers.
- Other files in `js/` provide page-specific interactions.
- `Freelancing Marketplace Platform.txt` is the original Week 1-8 brief.