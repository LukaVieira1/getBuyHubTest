# WikiMovies 🎬

A modern and responsive movie discovery platform built with Next.js, TypeScript, and Framer Motion. Browse, search, and explore movies with a Netflix-like experience.

[Live Demo](https://wikimovies.lukavieira.tech)

## ✨ Features

- 🌐 Multi-language support (English and Portuguese)
- 🎥 Netflix-style movie browsing
- 🔍 Real-time movie search
- 🎬 Movie details with trailers
- 👥 Cast information
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎨 Modern and clean UI
- 🎵 Splash screen with sound

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel
- **State Management:** React Context
- **HTTP Client:** Axios
- **Internationalization:** i18next
- **Date Handling:** Moment.js

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/wiki-movies.git
cd wiki-movies
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=https://api.themoviedb.org
NEXT_PUBLIC_API_KEY=your_tmdb_api_key_here
```

You can get your API key by registering [here](https://www.themoviedb.org/settings/api). For more information, check the [TMDB API documentation](https://developers.themoviedb.org/3/getting-started/introduction).

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📦 Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React contexts
├── hooks/         # Custom hooks
├── i18n/          # Internationalization
├── pages/         # Next.js pages
├── providers/     # Service providers
├── services/      # API services
├── styles/        # Global styles
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## 🌍 Internationalization

The app supports multiple languages:

- English (en-US)
- Portuguese (pt-BR)

Language can be changed through the language selector in the splash screen.

## 📱 Responsive Design

The app is fully responsive and optimized for:

- Mobile devices
- Tablets
- Desktop computers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

- **Luka Vieira**
- Website: [lukavieira.tech](https://lukavieira.tech)

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their excellent API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

Made with ❤️ by Luka Vieira
