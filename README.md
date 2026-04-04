# 📊 Premium Finance Dashboard UI

A state-of-the-art, high-performance financial management dashboard built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This application provides a seamless, offline-first experience for tracking wealth, analyzing spending patterns, and managing financial goals through interactive visualizations.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v20.x or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pawanp51/Finance-Dashboard-UI.git
   cd Finance-Dashboard-UI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Persistence**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via `idb-keyval`)
- **Visualizations**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

### 1. Dynamic Wealth Dashboard
- **Total Balance Synchronization**: Live calculation of assets (Income - Expenses) synced across the entire app.
- **Historical Trend Chart**: A multi-year (2024–2026) cumulative balance area chart that merges mock data with your live transactions seamlessly.
- **Spending Breakdown**: Visual pie chart representing category-wise expenditure.

### 2. Interactive Insights & AI-Driven Logic
- **Goal Tracker**: Set and edit financial targets (e.g., "Family Vacation Fund") with real-time progress bars and "Days to Goal" estimates.
- **Subscription Audit**: Automated detection of recurring charges (Netflix, Spotify, etc.) using a heuristic matching system.
- **What-If Calculator**: Interactive debt consolidation slider that calculates potential monthly interest savings in real-time.
- **Peak Expenditure**: Dynamic identification of spending outliers with contextual advice.

### 3. Professional Transaction Management
- **Smart Sorting**: Instantly sort by Amount with visual indicators.
- **Global Filters**: Search by description and filter by category or transaction type (Income/Expense).
- **Data Portability**: Export your transaction ledger as a **CSV file** with a single click.

### 4. Robust Backend Simulation
- **Mock API**: Built using Next.js Route Handlers (`/api/seed`) with simulated 1.0s network latency.
- **Smart Seeding**: Automatically populates the dashboard with 24 months of historical records on the first run.
- **Blurred UI Loader**: A sleek global loading experience during the data initialization phase.

### 5. Role-Based Access Control (RBAC)
- **Admin Mode**: Full access to create, update, and delete transactions or modify goals.
- **Viewer Mode**: A secure, read-only experience for auditing and reviewing data without modification privileges.

---

## 📐 Approach & Architecture

### **Offline-First State**
The application uses a hybrid state model. While it fetches initial "Seed" data from a mock API, all subsequent changes are persisted to the browser's **IndexedDB**. This ensures a zero-latency experience where data survives refreshes and session restarts.

### **Unified Design System**
Built with a "Clean & Premium" aesthetic, the UI utilizes a curated color palette (Royal Blue focus) with heavy emphasis on typography and micro-animations. The layout is **fully responsive**, transitioning from a fixed sidebar on desktop to a gestural off-canvas menu on mobile.

### **Data Integrity**
The **Balance Trend Chart** uses a "Seed Offset" logic, ensuring that historical mock data and your dynamic transactions flow together into a single, mathematically accurate line graph.

---

