import LanguageCard from "@/components/language-card";
import { languages } from "./_utils/languages";

export default function Home() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-3">
      {languages.map((language) => [
        <LanguageCard
          name={language.name}
          logo={language.logo}
          key={language.name}
        />,
      ])}
    </div>
  );
}
