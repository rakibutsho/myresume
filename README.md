# Md. Rakibul Islam - Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Performance](https://img.shields.io/badge/Lighthouse_Desktop-98/100-brightgreen?style=for-the-badge)

The source code for my personal portfolio website, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It is designed to be a highly performant, visually engaging showcase of my skills, projects, and professional experience as a Software Engineer.

🌐 **Live Demo:** [rakibutsho.dev](https://rakibutsho.dev)

---

## ⚡ Key Features

- **Modern UI/UX:** A sleek, premium dark-theme design featuring micro-interactions and glassy card effects.
- **Advanced Animations:** Smooth, scroll-triggered animations powered by **GSAP (ScrollTrigger)** and **Framer Motion**.
- **Extreme Performance:** 
  - Achieved a **98/100 Desktop Lighthouse Score**.
  - Total Blocking Time (TBT) reduced to **~40ms** through aggressive code-splitting and dynamic imports.
  - Image optimization via Next.js `<Image>` and AVIF support.
  - Deployed on a custom VPS, globally edge-cached via the **Cloudflare CDN**.
- **SEO Optimized:** Fully dynamic metadata, OpenGraph tags, and auto-generated XML sitemaps for maximum search engine visibility.
- **State Management:** Integrated **Redux Toolkit** for robust global state handling.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons:** [Hugeicons](https://hugeicons.com/) & [Lucide React](https://lucide.dev/)
- **Components:** [Radix UI](https://www.radix-ui.com/) & [React Aria Components](https://react-spectrum.adobe.com/react-aria/)

---

## 🚀 Local Development

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/myresume.git
   cd myresume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Build & Production

To build the application for production:

```bash
npm run build
```

This will automatically:
1. Generate the optimized `.next` build folder.
2. Run `next-sitemap` as a postbuild script to generate `sitemap.xml` and `robots.txt`.

Start the production server:
```bash
npm start
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
