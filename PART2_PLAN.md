# LUMIÈRE Candles — Part 2 Development Plan

This document outlines the next phase of development for the **LUMIÈRE Candles** website. The goal of Part 2 is to expand the showcase site into a highly interactive, cart-enabled catalog, preparing the project for bulk ordering via WhatsApp and premium customized experiences.

---

## 1. Unified Shopping Cart System (Client-Side)

### Goal
Allow customers to select multiple candles and checkout in a single request instead of ordering one item at a time.

### Technical Approach
- **State Management**: Implement a client-side cart store using **Zustand** or **React Context**.
- **Persistence**: Store the cart contents in `localStorage` so they persist when pages are reloaded.
- **Cart UI Drawer**:
  - Build a sliding cart sidebar drawer with smooth animations.
  - Show product thumbnail, name, selected quantity, unit price, and subtotal.
  - Allow incrementing, decrementing, and removing items directly from the drawer.

---

## 2. Aggregated WhatsApp Checkout

### Goal
Compile all cart items into a single, beautifully structured WhatsApp message when checking out.

### Technical Approach
- Format the WhatsApp order string dynamically to look professional:
  ```text
  ✨ LUMIÈRE Candles Order Request ✨
  
  Hello! I would like to order the following handmade candles:
  
  🕯️ 2x Classic Lavender — ₪89 each (Subtotal: ₪178)
  🕯️ 1x Royal Crimson (Velvet Rose & Oud) — ₪129 each (Subtotal: ₪129)
  
  ---------------------------------
  Total Price: ₪307
  
  Please confirm availability and delivery details. Thank you!
  ```
- Use `encodeURIComponent` to construct the checkout URL.

---

## 3. Dynamic Product Detail Pages (`/catalog/[id]`)

### Goal
Provide a premium detail page for each candle to showcase scent profiles, ingredients, and burning guidelines.

### Technical Approach
- **Dynamic Routing**: Create `app/[locale]/catalog/[id]/page.tsx`.
- **Expanded Schema**: Update `/data/products.json` to include:
  - `burnTime` (e.g. "50 Hours")
  - `size` (e.g. "220g / 7.8oz")
  - `scentNotes`: `{ "top": "...", "middle": "...", "base": "..." }`
  - `ingredients` (e.g. "100% natural soy wax, essential oils, organic cotton wick")
- **Layout & Visuals**:
  - Zoomable high-quality image viewer.
  - Accordion for "Scent Description", "Burn & Care Guide", and "Shipping details".

---

## 4. Custom Candle Customizer (Virtual Studio)

### Goal
Provide a luxury interactive customizer where users can design their own candles (great for gifts, weddings, or corporate events).

### Technical Approach
- Create a `/customize` route.
- Interactive multi-step form to choose:
  1. **Jar Style**: Amber Glass, Royal Crimson Glass, Gold Metal Tin.
  2. **Fragrance Blend**: Lavender & Vanilla, Rose & Sandalwood, Pine & Bergamot.
  3. **Wick Type**: Natural Cotton, Crackling Wood Wick.
  4. **Personalized Label**: Input custom text (e.g., "Happy Birthday Sophia", "Thank you").
- Dynamic card preview that visualizes the selection using CSS filters or overlaid layer images.
- Checkout option sending the custom specifications directly to WhatsApp.

---

## 5. Transition Animations & Micro-Interactions

### Goal
Elevate the luxurious feel of the site with top-tier feedback and page transitions.

### Technical Approach
- Integrate **Framer Motion** or standard CSS transitions for:
  - Smooth page fades when switching locales or navigating pages.
  - Staggered entry animation on product cards as they load or filter.
  - Flying cart animations (adding an item sends a mini-icon flying into the cart button).

---

## 6. Admin Collection Management (CRUD)

### Goal
Provide a private administration dashboard to add, edit, and delete candles in the collection without writing code or editing files manually.

### Technical Approach
- **Secure Access Route**: Create a `/admin` portal. Implement a basic password lock or environment variable authentication (`ADMIN_PASSWORD`).
- **Admin Dashboard Layout**:
  - List all candles in a clean table view showing image, name, price, category, status (Available/Out of Stock), and actions (Edit / Delete).
  - Add a "Create Candle" button opening a form modal.
- **Form Fields**:
  - Name & Description (with separate inputs for English, Hebrew, and Arabic to support `next-intl` localization).
  - Price (numeric input).
  - Category selection (Classic Scented, Special Edition, Aromatherapy).
  - Image selection (file uploader or text field for image path).
  - Available toggle (boolean).
- **Backend Storage Operations**:
  - **Local Development**: Implement Next.js **Server Actions** to read, write, and delete entries inside the `/data/products.json` file.
  - **Production Hosting (e.g. Vercel)**: Since serverless environments have a read-only filesystem, transition from local JSON file read/writes to a free-tier database (such as **Supabase / PostgreSQL** or **MongoDB**). Connect the Server Actions to update the database instead of the local JSON file.

---

## 7. Selected Technical Decisions (User Approved)

Based on the alignment questions, the following tech stack and feature behaviors have been selected for Part 2:

- **Admin Authentication**: **Supabase Auth or Clerk** (using secure passwordless magic links or OTP, ready for production).
- **Product Database**: **Supabase (PostgreSQL)** (handles collections, availability state, and integrates perfectly with Next.js Server Actions).
- **Image Upload Storage**: **Supabase Storage or Vercel Blob** (to persist candle product photos uploaded by the admin on the cloud).
- **Virtual Studio Visualizer**: **Layered static assets with CSS color/opacity filters** (combines container styles, wicks, and wax overlays dynamically for a performant yet elegant preview).


