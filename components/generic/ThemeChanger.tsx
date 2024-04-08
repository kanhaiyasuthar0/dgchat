import { useEffect, useState } from "react";

const ThemeCustomization: React.FC = ({}: //   handleClose,
{
  //   handleClose: () => void;
}) => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <section className="space-y-4">
      {/* <div className="flex items-center">
        <input
          onClick={() => toggleTheme("light")}
          value={theme}
          checked={theme == "light"}
          type="radio"
          id="light-theme"
          name="theme"
          className="w-4 h-4 text-blue-600 cursor-pointer dark:bg-gray-700 bg-gray-300 border-gray-600 dark:border-gray-600 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="light-theme"
          className="ml-2 block cursor-pointer text-sm font-medium dark:text-white text-gray-900"
        >
          Light
        </label>
      </div>
      <div className="flex items-center">
        <input
          checked={theme == "dark"}
          onClick={() => toggleTheme("dark")}
          type="radio"
          id="dark-theme"
          name="theme"
          className="w-4 h-4 cursor-pointer text-blue-600 dark:bg-gray-700 bg-gray-300 border-gray-600 dark:border-gray-600 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="dark-theme"
          className="ml-2 block cursor-pointer text-sm font-medium dark:text-white text-gray-900"
        >
          Dark
        </label>
      </div> */}

      <button
        onClick={() => toggleTheme(theme == "light" ? "dark" : "light")}
        className="p-2 transition duration-500 ease-in-out rounded-full text-gray-600 bg-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </section>
  );
};

export default ThemeCustomization;
