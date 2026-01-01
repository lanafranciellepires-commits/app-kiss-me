"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Heart, X, MapPin, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

// Dados de exemplo de perfis
const mockProfiles = [
  {
    id: 1,
    name: "Maria",
    age: 28,
    country: "Brasil",
    distance: 5,
    compatibility: 95,
    photo: "M",
    bio: "Adoro viajar e conhecer novas culturas. Procuro algo sério.",
    gender: "feminine",
    height: 165
  },
  {
    id: 2,
    name: "Ana",
    age: 25,
    country: "Portugal",
    distance: 12,
    compatibility: 88,
    photo: "A",
    bio: "Apaixonada por música e arte. Busco conexões verdadeiras.",
    gender: "feminine",
    height: 170
  },
  {
    id: 3,
    name: "Carlos",
    age: 32,
    country: "Brasil",
    distance: 8,
    compatibility: 82,
    photo: "C",
    bio: "Engenheiro, gosto de esportes e natureza.",
    gender: "masculine",
    height: 180
  },
  {
    id: 4,
    name: "Julia",
    age: 27,
    country: "Brasil",
    distance: 15,
    compatibility: 78,
    photo: "J",
    bio: "Professora, amo ler e cozinhar. Procuro alguém especial.",
    gender: "feminine",
    height: 162
  },
  {
    id: 5,
    name: "Pedro",
    age: 30,
    country: "Brasil",
    distance: 20,
    compatibility: 75,
    photo: "P",
    bio: "Desenvolvedor, gamer nas horas vagas. Busco algo casual.",
    gender: "masculine",
    height: 175
  }
];

export default function MatchPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const currentProfile = profiles[currentIndex];

  const handleLike = () => {
    alert(`${t.matchWith || "Match com"} ${currentProfile.name}! 💕`);
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(t.noMoreProfiles || "Não há mais perfis disponíveis no momento!");
      router.push('/');
    }
  };

  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 75) return "text-teal-600 bg-teal-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-orange-600 bg-orange-100";
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            {t.noMoreProfiles || "Não há mais perfis disponíveis"}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {t.backToHome || "Voltar ao Início"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-cyan-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.back || "Voltar"}</span>
        </button>
        <div className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
            {t.findMatch || "Encontrar Match"}
          </span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Card */}
          <div className="relative">
            {/* Profile Photo Placeholder */}
            <div className="w-full h-96 bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-9xl font-bold">{currentProfile.photo}</span>
            </div>

            {/* Compatibility Badge */}
            <div className="absolute top-4 right-4">
              <div className={`px-4 py-2 rounded-full font-bold text-lg shadow-lg ${getCompatibilityColor(currentProfile.compatibility)}`}>
                {currentProfile.compatibility}%
              </div>
            </div>

            {/* Info Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="absolute top-4 left-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <Info className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-gray-800">
                {currentProfile.name}, {currentProfile.age}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{currentProfile.country} • {currentProfile.distance} km {t.away || "de distância"}</span>
            </div>

            {showInfo && (
              <div className="mb-4 p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>{t.height || "Altura"}:</strong> {currentProfile.height} cm
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>{t.gender || "Gênero"}:</strong> {t[currentProfile.gender as keyof typeof t] || currentProfile.gender}
                </p>
                <p className="text-sm text-gray-600 italic">
                  {t.compatibilityInfo || "O percentual mostra a compatibilidade com suas preferências"}
                </p>
              </div>
            )}

            <p className="text-gray-700 leading-relaxed mb-6">
              {currentProfile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePass}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-200 hover:bg-gray-300 rounded-2xl transition-all shadow-lg hover:shadow-xl"
              >
                <X className="w-8 h-8 text-gray-600" />
              </button>
              <button
                onClick={handleLike}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#CC5500] to-[#FF6B35] hover:shadow-2xl rounded-2xl transition-all shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" fill="white" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {currentIndex + 1} / {profiles.length} {t.profiles || "perfis"}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <p className="text-sm text-gray-700 text-center">
            <strong className="text-teal-600">{t.tip || "Dica"}:</strong> {t.matchTip || "Os perfis são ordenados por maior compatibilidade com suas preferências!"}
          </p>
        </div>
      </div>
    </div>
  );
}
