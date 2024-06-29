import { useState } from "react";

interface LangSelectorProps {
  onLangChange: (lang: string) => void;
}

const LangSelector: React.FC<LangSelectorProps> = (props) => {
  const [lang, setLang] = useState<string>("English");

  const onLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const seletctedLang = e.target.value;
    setLang(seletctedLang);
    props.onLangChange(seletctedLang);
  };

  return (
    <select
      value={lang}
      onChange={onLangChange}
      style={{ marginRight: "20px" }}
    >
      <option value="English">English</option>
      <option value="Arabic">Arabic</option>
    </select>
  );
};

export default LangSelector;
