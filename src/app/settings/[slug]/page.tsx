"use client";
import { usePathname } from "next/navigation";

const SettingsPage = () => {
  const pathname = usePathname(); // Utilise usePathname pour obtenir le chemin actuel

  // Récupérer le paramètre slug
  const slug = pathname?.split("/").pop(); // On prend la dernière partie de l'URL

  return (
    <div>
      <h1>Settings - {slug}</h1>
      <p>Voici la page de {slug}</p>
    </div>
  );
};

export default SettingsPage;
