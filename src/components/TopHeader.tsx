import { useState } from "react";
import LangSelector from "./LangSelector";
import "./TopHeader.css";

function TopHeader() {
  const [language, setLanguage] = useState<string>("English");

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    console.log(lang);
  };

  return (
    <>
      <LangSelector onLangChange={handleLangChange} />
      {language === "English" ? (
        <h1>Todo App</h1>
      ) : (
        <h1 style={{ textAlign: "end" }}>قائمة المهام</h1>
      )}
    </>
  );
}

export default TopHeader;
