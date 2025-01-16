import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface CategoryDropdownProps {
  categories: { id: number; name: string }[];
  onSelect: (categoryName: string) => void;
}

export default function CategoryDropdown({
  categories,
  onSelect,
}: CategoryDropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    onSelect(categoryName);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-t-md text-sm font-medium flex items-center ${
          isOpen ? "bg-gray-800/95 text-white" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("home.categories")}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="fixed lg:absolute right-0 w-48 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-lg rounded-tr-none shadow-lg overflow-hidden"
            style={{
              marginTop: "-1px",
            }}
          >
            <div className="max-h-[300px] overflow-y-auto scrollbar-hide py-1">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleSelect(category.name)}
                  className="w-full px-4 py-2 text-sm text-left text-white hover:bg-red-500/10 transition-colors duration-200 flex items-center space-x-2"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{t(`categories.${category.name.toLowerCase()}`)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
