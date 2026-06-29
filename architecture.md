Here is a comprehensive, production-grade Product Requirement Document (PRD) and Master System Prompt. You can save this directly as `system_blueprint.md` or `instructions.txt` for your AI development agent to read, parse, and execute step-by-step.

---

# System Blueprint & Implementation Prompt: "Sevens Sports Arena" Next.js Blog

## Role & Context

You are an expert Full-Stack Software Engineer and Solutions Architect. You are tasked with building **Sevens Sports Arena**, a high-performance, scalable, and highly interactive sports blog built using the **Next.js App Router**. The initial focus is on Football (specifically divided into European and Nigerian football ecosystems), designed with a architecture that seamlessly scales to other sports (Basketball, Athletics, Combat Sports, etc.) down the line.

The system comprises two core faces:

1. **The Public View:** A lightning-fast, SEO-optimized content platform with high user engagement (reactions, comments).
2. **The Admin Dashboard:** A dense, secure management center to track detailed page analytics, moderate comments, publish rich-text articles, and manage contextually targeted sponsored advertisement networks.

---

## 1. Technical Stack Constraints

* **Framework:** Next.js (App Router) using React Server Components (RSC) for maximum SEO and static generation performance, and Client Components for dynamic parts.
* **Database:** PostgreSQL managed via **Supabase** (Real-time capability enabled).
* **ORM:** **Drizzle ORM** or **Prisma** for type-safe database mapping.
* **Styling & UI:** **Tailwind CSS** combined with **Shadcn UI** components.
* **Icons:** **Local SVG assets** or standard Lucide icons (do not auto-generate inline SVGs in codebase files; use clean components).
* **Authentication:** Supabase Auth (Supporting Email/Password and OAuth for Admin/Authenticated users; anonymous users require no auth state).

---

## 2. Relational Database Schema

Design a highly scalable, indexed PostgreSQL schema mapping these relationships:

* **`sports`**: `id` (PK), `name` (e.g., Football), `slug` (unique).
* **`categories`**: `id` (PK), `sport_id` (FK), `name` (e.g., European Football, Nigerian Football), `slug` (unique).
* **`posts`**: `id` (PK), `author_id` (FK), `category_id` (FK), `title`, `slug` (unique), `content` (Rich text/JSON/HTML), `cover_image_url`, `status` (`draft` | `published`), `is_featured` (boolean), `is_sponsored` (boolean), `created_at`, `updated_at`.
* **`tags`**: `id` (PK), `category_id` (FK, nullable for cross-cutting tags), `name` (e.g., Transfers, EPL, UCL, NPFL, Super Eagles), `slug` (unique).
* **`post_tags`**: Junction table for Many-to-Many relationship between `posts` and `tags`. Composite key: `(post_id, tag_id)`.
* **`reactions`**: `id` (PK), `post_id` (FK), `type` (enum: `like`, `fire`, `goal`, `shock`), `session_hash` (anonymous unique identifier to limit spam clicking).
* **`comments`**: `id` (PK), `post_id` (FK), `user_id` (FK, nullable), `guest_name` (varchar, nullable for anonymous comments), `content`, `is_approved` (boolean, defaults to false for guests, true for authenticated users), `created_at`.
* **`ads`**: `id` (PK), `title`, `image_url`, `target_url`, `placement` (enum: `hero_banner`, `sidebar`, `inline_post`), `status` (enum: `active`, `paused`), `start_date`, `end_date`.
* **`ad_analytics`**: `id` (PK), `ad_id` (FK), `event_type` (enum: `impression`, `click`), `post_id` (FK, nullable, to track which post generated the ad click), `created_at`.

---

## 3. Architecture & Routing Strategy

Implement logical directory grouping using Next.js route groups:

### Public Facing Layer `src/app/(public)/`

* `/`: Home feed displaying a **Hero/Featured Section** and a grid of **Latest News** utilizing an optimized pagination ("Load more") pattern.
* `/[category]/`: Dynamic category router capturing layouts like `/european-football` or `/nigerian-football`.
* `/[category]/[slug]/`: Single article rendering layer.
* *Performance Optimization:* Use **Incremental Static Regeneration (ISR)** (`revalidate: 60`) for instant visual delivery, combining server-rendered static markdown text with dynamic, client-side interactive sub-islands for comments, reactions, and ad assets.


* `/tags/[tagSlug]/`: Content stream capturing all articles mapped across specific taxonomy tags (e.g., `/tags/transfers`).

### Admin Panel Layer `src/app/(admin)/`

* `/admin/dashboard`: Global analytics desk tracking metrics globally and per post/tag.
* `/admin/posts`: Data-table showing all articles with robust filtering (by category, tag, status). Includes a creation engine using a **Rich Text Editor** with drag-and-drop media uploading capabilities.
* `/admin/comments`: Moderation interface showcasing a real-time table of unapproved guest comments with quick binary validation ("Approve" / "Delete").
* `/admin/ads`: Management console creating structural ad campaigns, uploading ad creatives, setting destination anchors, and evaluating CTR performance charts.

---

## 4. Feature Execution Requirements

### A. Dynamic Tag Architecture & The Admin UI

* Implement a searchable **Multi-Select Combobox** inside the article publisher panel.
* Support **"Create on-the-fly" tag injection**: If an administrator types an unlisted token (e.g., `#osimhen`), provide an inline mechanism to instantiate the tag metadata table entry dynamically without navigating away from the current post composer session.

### B. High-Performance Internal Analytics (No Third-Party Bloat)

* **Post Views:** Build an isolated, lightweight background transaction system. When a reader opens `/[category]/[slug]`, execute a non-blocking background write execution (via Next.js Middleware, Server Actions, or an internal Edge endpoint) that increments the view database layer without bottlenecking core layouts or cumulative layout shifts (CLS).
* **Ad Campaign Engines (Impressions & CTR):**
* **Impressions:** Implement an analytical tracking strategy using the browser's `IntersectionObserver` API on the client side. Log a unique transaction when an active structural ad component stays visible inside the reader's viewport frame for $\ge 1$ continuous second.
* **Clicks:** Process target anchors through a proxy forwarding endpoint redirect handler (e.g., `/api/ads/click?id=[id]&dest=[url]`) which captures click telemetry before resolving the user's browser location.



### C. Contextual Ad Distribution & Monetization

* Empower the ad setup menu with **Contextual Tag Targeting Rules**. Allow ads to be optionally targeted to particular tags (e.g., display a betting/jersey ad campaign explicitly on pages containing `#transfers` or `#epl` tags).
* Inject structural programmatic layout ad spaces: dynamically loop page markup objects and inject native components into positions like every $X$ paragraphs inside the raw Markdown text payload.

### D. Optimistic Interaction System

* **Comments:** Support two entry pathways: authenticated accounts and anonymous guest profiles (requiring an input moniker string). Guest commentary payloads remain queued behind an `is_approved = false` constraint.
* **Reactions Engine:** Utilize React's hook architectures (`useOptimistic`) to increment interaction metrics locally instantly upon a user click action, dispatching structural state syncing queries downstream to the Supabase layer in the background.

---

## 5. Execution Milestone Roadmap

When executing this project, build and verify features in this exact order:

1. **Phase 1:** Core Data Models & Database Migrations (Supabase schemas + indexes on slugs and timestamps).
2. **Phase 2:** Static Public Layer Routing (Home, Categories, Individual Post Layout with mock content, ISR verification).
3. **Phase 3:** Interactive Public Engines (Optimistic Comments layout, Reaction modules, Anonymous moderation status handling).
4. **Phase 4:** Protected Admin Area Core (Workspace layout, Authenticated routes, Combobox Tag integration, Rich Text Editor).
5. **Phase 5:** Ad Placement Engine & Lightweight Internal Tracking Analytics (Telemetry API handlers, View counters, Impression observers, Admin reporting dashboard with interactive UI graph charts).