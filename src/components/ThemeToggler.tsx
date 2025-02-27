import { Switch } from "antd";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";


const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme class to HTML tag
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

return (
    <Switch
        className="flex gap-2 items-center w-14 !ml-5"
        style={{backgroundColor: theme === "dark" ? "#000" : " #e5e7eb"}}
        onClick={toggleTheme}
        checkedChildren={<Moon size={20} />}
        unCheckedChildren={<Sun size={20} color="black" />}
        checked={theme === "dark"}
    />
);
};

export default ThemeToggle;
