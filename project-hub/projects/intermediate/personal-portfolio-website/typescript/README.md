# ZERO-PORTFOLIO 🚀

Welcome to my portfolio website! This is a showcase of my skills in full-stack web development, featuring projects built with Next.js, Rust, Prisma, and more. From dynamic web applications to e-commerce platforms and SaaS solutions.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Convex (Real-time database)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashish1022/ZERO-PORTFOLIO.git
   cd ZERO-PORTFOLIO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install shadcn/ui components (if needed)**
   ```bash
   npx shadcn-ui@latest init
   ```
   This will set up shadcn/ui with your existing `components.json` configuration.

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your Convex URL:
   ```env
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url_here
   ```
   
   To get your Convex URL:
   - Sign up at [Convex](https://convex.dev)
   - Create a new project
   - Run `npx convex dev` to set up your backend
   - Copy the deployment URL from your Convex dashboard

5. **Set up Convex (if not already done)**
   ```bash
   npx convex dev
   ```
   This will:
   - Prompt you to log in with GitHub
   - Create a Convex project
   - Generate your production and deployment URLs
   - Set up the `convex/` folder for backend functions

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio in action!

## 📁 Project Structure

```
ZERO-PORTFOLIO/
├── Providers/          # Context providers and wrappers
├── app/               # Next.js app directory (pages and layouts)
├── components/        # Reusable UI components
├── constants/         # Application constants and configuration
├── convex/           # Convex backend functions and schema
├── lib/              # Utility functions and helpers
├── public/           # Static assets (images, icons, etc.)
├── .eslintrc.json    # ESLint configuration
├── .gitignore        # Git ignore rules
├── README.md         # Project documentation
├── components.json   # shadcn/ui components configuration
├── ignore.txt        # Additional ignore rules
├── next.config.mjs   # Next.js configuration
├── package-lock.json # Locked dependency versions
├── package.json      # Project dependencies and scripts
├── postcss.config.mjs # PostCSS configuration
├── sampleData.json   # Sample data for development
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

## 🎨 Features

- **Responsive Design**: Optimized for all device sizes
- **Real-time Data**: Powered by Convex backend
- **Modern UI**: Built with shadcn/ui components
- **Type Safety**: Full TypeScript support
- **Fast Performance**: Built with Next.js App Router for optimal speed
- **SEO Optimized**: Meta tags and structured data
- **Tailwind CSS**: Utility-first styling approach

## 📸 Site Preview

### Homepage
![Homepage Screenshot](./public/screenshots/homepage.png)
*Clean and modern landing page showcasing skills and introduction*

### Projects Section
![Projects Screenshot](./public/screenshots/projects.png)
*Interactive project gallery with detailed descriptions*

### About Section
![About Screenshot](./public/screenshots/about.png)
*Personal information and technical skills*

### Contact Section
![Contact Screenshot](./public/screenshots/contact.png)
*Contact form with real-time message handling*

> **Note**: Add actual screenshots to the `/public/screenshots/` directory and update the paths accordingly.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx convex dev` - Start Convex development environment

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add these environment variables in your deployment platform:
```
NEXT_PUBLIC_CONVEX_URL=your_production_convex_url
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Ashish** - [GitHub](https://github.com/Ashish1022)

Project Link: [https://github.com/Ashish1022/ZERO-PORTFOLIO](https://github.com/Ashish1022/ZERO-PORTFOLIO)

---

⭐ Don't forget to give this repo a star if you found it helpful!

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/Ashish1022/ZERO-PORTFOLIO/issues) on GitHub.

## 🚀 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Blog section integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Performance optimizations