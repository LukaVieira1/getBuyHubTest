// React
import { useEffect, useState } from "react";
import Link from "next/link";

// Services
import {
  getMoviesByGenre,
  getMoviesByKeywords,
  getPopularMovies,
} from "@/services/movie";

// Types
import { IMovie } from "@/types/movie";

// Components
import MovieCarousel from "@/components/MovieCarousel";
import { Spinner } from "@/components/Spinner";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import CategoryDropdown from "@/components/CategoryDropdown";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Heroicons
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// Hooks
import { useScrollPosition } from "@/hooks/useScrollPosition";

// Contexts
import { useUI } from "@/contexts/UIContext";

// i18n
import { useTranslation } from "react-i18next";

// Utils
import { genres } from "@/utils/moviesGenres";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<IMovie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<IMovie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<IMovie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<IMovie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<IMovie[]>([]);
  const [documentaryMovies, setDocumentaryMovies] = useState<IMovie[]>([]);
  const [searchResults, setSearchResults] = useState<IMovie[] | null>(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 100;
  const { isModalOpen } = useUI();

  const { t } = useTranslation("common");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [
          popularData,
          fantasyData,
          comedyData,
          dramaData,
          horrorData,
          romanceData,
          documentaryData,
        ] = await Promise.all([
          getPopularMovies(1, t("param.language")),
          getMoviesByGenre("Fantasy", 1, t("param.language")),
          getMoviesByGenre("Comedy", 1, t("param.language")),
          getMoviesByGenre("Drama", 1, t("param.language")),
          getMoviesByGenre("Horror", 1, t("param.language")),
          getMoviesByGenre("Romance", 1, t("param.language")),
          getMoviesByGenre("Documentary", 1, t("param.language")),
        ]);
        setPopularMovies(popularData.results);
        setFantasyMovies(fantasyData.results);
        setComedyMovies(comedyData.results);
        setDramaMovies(dramaData.results);
        setHorrorMovies(horrorData.results);
        setRomanceMovies(romanceData.results);
        setDocumentaryMovies(documentaryData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleHomeClick = () => {
    setSearchResults(null);
    setSearch("");
    setCurrentCategory("");
    setSelectedCategory("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadMoreMovies = async () => {
    try {
      const nextPage = currentPage + 1;
      let data;

      if (currentSearchTerm) {
        data = await getMoviesByKeywords(
          currentSearchTerm,
          t("param.language"),
          nextPage
        );
      } else if (currentCategory) {
        data = await getMoviesByGenre(
          currentCategory,
          nextPage,
          t("param.language")
        );
      } else {
        return;
      }

      setSearchResults((prev) => [...(prev || []), ...data.results]);
      setCurrentPage(nextPage);
      setHasMore(data.page < data.total_pages);
      setTotalResults(data.total_results);
    } catch (error) {
      console.error("Error loading more movies:", error);
    }
  };

  const handleSearch = async (results: IMovie[] | null, term: string) => {
    setCurrentSearchTerm(term);
    setCurrentCategory("");
    setSelectedCategory("");
    setCurrentPage(1);

    if (term.trim()) {
      try {
        setIsSearching(true);
        const data = await getMoviesByKeywords(term, t("param.language"));
        setSearchResults(data.results);
        setHasMore(data.page < data.total_pages);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
        setHasMore(false);
        setTotalResults(0);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults(null);
      setHasMore(false);
      setTotalResults(0);
    }
  };

  const handleCategorySelect = async (categoryName: string) => {
    try {
      setSearch("");
      setCurrentSearchTerm("");

      setCategoryLoading(true);
      setCurrentCategory(categoryName);
      setCurrentPage(1);

      setSearchResults(null);

      window.scrollTo({ top: 0, behavior: "smooth" });

      const data = await getMoviesByGenre(categoryName, 1, t("param.language"));

      setSearchResults(data.results);
      setHasMore(data.page < data.total_pages);
      setTotalResults(data.total_results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchResults([]);
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleClearSearch = () => {
    if (!currentCategory) {
      setSearchResults(null);
      setSearch("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pb-16">
      {/* Navigation */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(17, 24, 39, 0.8)"
            : "rgba(17, 24, 39, 0)",
          backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
          y: isModalOpen ? -100 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1],
        }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          !isScrolled &&
          "bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-4 py-4 lg:py-0 lg:h-16">
            <motion.div
              className="text-2xl font-bold text-red-600 flex items-center justify-between lg:w-[140px]"
              whileHover={{ scale: 1.05 }}
            >
              WikiMovies
              <div className="flex lg:hidden space-x-4">
                <motion.button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHomeClick}
                >
                  {t("home.home")}
                </motion.button>
                <CategoryDropdown
                  categories={genres}
                  onSelect={handleCategorySelect}
                  selectedCategory={currentCategory}
                />
              </div>
            </motion.div>
            <div className="w-full lg:flex-1 lg:flex lg:justify-center">
              <div className="w-full lg:max-w-xl">
                <SearchBar
                  onSearchResults={(results, term) =>
                    handleSearch(results, term)
                  }
                  onSearchChange={setSearch}
                  value={search}
                  onClearSearch={handleClearSearch}
                  isSearchDisabled={categoryLoading}
                  isLoading={isSearching}
                />
              </div>
            </div>
            <div className="hidden lg:flex space-x-4 lg:w-[140px] lg:justify-end">
              <motion.button
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHomeClick}
              >
                {t("home.home")}
              </motion.button>
              <CategoryDropdown
                categories={genres}
                onSelect={handleCategorySelect}
                selectedCategory={currentCategory}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <header
        className={`relative h-[70vh] mb-8 pt-16 max-[325px]:mt-36 max-[375px]:mt-24 ${
          (searchResults && !categoryLoading) || categoryLoading ? "hidden" : ""
        }`}
      >
        {popularMovies[0] && !categoryLoading && (
          <>
            <div className="absolute inset-0">
              <img
                src={`https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path}`}
                alt={popularMovies[0].title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/0 to-transparent h-32"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
              <motion.h1
                className="text-4xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {popularMovies[0].title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {popularMovies[0].overview}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href={`/movie/${popularMovies[0].id}`}>
                  <button className="mt-4 inline-flex items-center px-6 py-3 rounded-lg border-2 border-white/20 hover:border-white bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-300 group">
                    <InformationCircleIcon className="w-5 h-5 mr-2 group-hover:text-red-500 transition-colors" />
                    <span className="font-medium">{t("home.moreInfo")}</span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main
        className={`relative z-10 ${
          searchResults || categoryLoading ? "pt-32 md:pt-24" : "pt-8"
        }`}
      >
        <AnimatePresence mode="wait">
          {searchResults ? (
            <SearchResults
              movies={searchResults}
              searchTerm={currentSearchTerm || currentCategory}
              hasMore={hasMore}
              onLoadMore={loadMoreMovies}
              totalResults={totalResults}
              isCategory={!!currentCategory}
              isLoading={isSearching}
            />
          ) : (
            <>
              {categoryLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <Spinner />
                </div>
              ) : (
                <>
                  <MovieCarousel
                    title={t("categories.popular")}
                    initialMovies={popularMovies}
                  />
                  <MovieCarousel
                    title={t("categories.fantasy")}
                    initialMovies={fantasyMovies}
                  />
                  <MovieCarousel
                    title={t("categories.comedy")}
                    initialMovies={comedyMovies}
                  />
                  <MovieCarousel
                    title={t("categories.drama")}
                    initialMovies={dramaMovies}
                  />
                  <MovieCarousel
                    title={t("categories.horror")}
                    initialMovies={horrorMovies}
                  />
                  <MovieCarousel
                    title={t("categories.romance")}
                    initialMovies={romanceMovies}
                  />
                  <MovieCarousel
                    title={t("categories.documentary")}
                    initialMovies={documentaryMovies}
                  />
                </>
              )}
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
