"use client";

import { useState, useEffect } from "react";
import { Heart, Settings, User, Sliders, MessageCircle, Star, Camera } from "lucide-react";
import { translations } from "../lib/translations";
import { useRouter } from "next/navigation";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Mandarin Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ar', name: 'Standard Arabic' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ur', name: 'Urdu' },
  { code: 'id', name: 'Indonesian' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'pcm', name: 'Nigerian Pidgin' },
  { code: 'arz', name: 'Egyptian Arabic' },
  { code: 'mr', name: 'Marathi' },
  { code: 'te', name: 'Telugu' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ta', name: 'Tamil' },
  { code: 'yue', name: 'Cantonese' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'wuu', name: 'Wu Chinese' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'ko', name: 'Korean' },
  { code: 'fa', name: 'Persian (Iranian)' },
  { code: 'it', name: 'Italian' },
  { code: 'sw', name: 'Swahili' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'bho', name: 'Bhojpuri' },
  { code: 'nan', name: 'Min Nan Chinese' },
  { code: 'hak', name: 'Hakka Chinese' },
  { code: 'ha', name: 'Hausa' },
  { code: 'my', name: 'Burmese' },
  { code: 'ckb', name: 'Central Kurdish' },
  { code: 'or', name: 'Odia' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'su', name: 'Sudanese' },
  { code: 'hsn', name: 'Xiang Chinese' },
  { code: 'pl', name: 'Polish' },
  { code: 'jv', name: 'Javanese' },
  { code: 'ps', name: 'Pashto' },
  { code: 'ro', name: 'Romanian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'saz', name: 'Sourashtra' },
  { code: 'ne', name: 'Nepali' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'as', name: 'Assamese' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'za', name: 'Zhuang' },
  { code: 'th', name: 'Thai' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'fil', name: 'Filipino' },
  { code: 'fy', name: 'Western Frisian' },
  { code: 'om', name: 'Oromo' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'am', name: 'Amharic' },
  { code: 'ny', name: 'Chewa' },
  { code: 'ff', name: 'Fulah' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'so', name: 'Somali' },
  { code: 'qu', name: 'Quechua' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'ts', name: 'Tsonga' },
  { code: 'ak', name: 'Akan' },
  { code: 'diq', name: 'Zazaki' },
  { code: 'sc', name: 'Sardinian' }
];

export default function HomePage() {
  const [language, setLanguage] = useState("en");
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-cyan-100">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">Kiss Me </span>
          <span className="text-[#8B0000]">💋</span>
          <span className="bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent"> Best Date App</span>
        </div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              🌐 {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full">
          {/* Match Finder */}
          <button 
            onClick={() => router.push('/match')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Heart className="w-12 h-12 text-[#CC5500] mb-3" fill="#CC5500" />
            <span className="text-lg font-semibold text-gray-800">{t.matchFinder}</span>
          </button>

          {/* Settings */}
          <button 
            onClick={() => router.push('/configuracoes')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Settings className="w-12 h-12 text-gray-600 mb-3" />
            <span className="text-lg font-semibold text-gray-800">{t.settings}</span>
          </button>

          {/* Profile */}
          <button 
            onClick={() => router.push('/perfil')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <User className="w-12 h-12 text-blue-500 mb-3" />
            <span className="text-lg font-semibold text-gray-800">{t.profile}</span>
          </button>

          {/* Preferences */}
          <button 
            onClick={() => router.push('/preferencias')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Sliders className="w-12 h-12 text-purple-500 mb-3" />
            <span className="text-lg font-semibold text-gray-800">{t.preferences}</span>
          </button>

          {/* Chat */}
          <button 
            onClick={() => router.push('/chat')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <MessageCircle className="w-12 h-12 text-green-500 mb-3" />
            <span className="text-lg font-semibold text-gray-800">{t.chat}</span>
          </button>

          {/* Photos */}
          <button 
            onClick={() => router.push('/fotos')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Camera className="w-12 h-12 text-orange-500 mb-3" />
            <span className="text-lg font-semibold text-gray-800">{t.photos}</span>
          </button>

          {/* Feedback Button */}
          <button 
            onClick={() => router.push('/feedback')}
            className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Star className="w-12 h-12 text-yellow-500 mb-3" />
            <span className="text-lg font-semibold text-gray-800">{t.feedback}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
