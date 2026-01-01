"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

export default function PreferenciasPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  
  const [preferences, setPreferences] = useState({
    genders: [] as string[],
    sexualOrientations: [] as string[],
    incomeRanges: [] as string[],
    politicalViews: [] as string[],
    objectives: [] as string[],
    maritalStatuses: [] as string[],
    educations: [] as string[],
    bodyTypes: [] as string[],
    religions: [] as string[],
    heightMin: "150",
    heightMax: "200",
    ageMin: "18",
    ageMax: "50",
    maxDistance: "50"
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleCheckboxChange = (category: string, value: string) => {
    const currentValues = preferences[category as keyof typeof preferences] as string[];
    
    if (currentValues.includes(value)) {
      setPreferences({
        ...preferences,
        [category]: currentValues.filter(v => v !== value)
      });
    } else {
      setPreferences({
        ...preferences,
        [category]: [...currentValues, value]
      });
    }
  };

  const handleRangeChange = (field: string, value: string) => {
    setPreferences({
      ...preferences,
      [field]: value
    });
  };

  const handleSave = () => {
    alert(t.preferencesSaved || "Preferências salvas com sucesso!");
    console.log("Preferências:", preferences);
  };

  const CheckboxGroup = ({ 
    title, 
    category, 
    options 
  }: { 
    title: string; 
    category: string; 
    options: { value: string; label: string }[] 
  }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-teal-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={(preferences[category as keyof typeof preferences] as string[]).includes(option.value)}
              onChange={() => handleCheckboxChange(category, option.value)}
              className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-400"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

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
            {t.preferences || "Preferências"}
          </span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
            {t.matchPreferences || "Preferências de Match"}
          </h2>
          <p className="text-gray-600 mb-8">
            {t.selectDesiredCharacteristics || "Selecione as características desejadas para encontrar seu par ideal"}
          </p>

          <div className="space-y-8">
            {/* Gênero */}
            <CheckboxGroup
              title={t.gender || "Gênero"}
              category="genders"
              options={[
                { value: "masculine", label: t.masculine || "Masculino" },
                { value: "feminine", label: t.feminine || "Feminino" },
                { value: "nonBinary", label: t.nonBinary || "Não binário" },
                { value: "other", label: t.other || "Outro" }
              ]}
            />

            {/* Orientação Sexual */}
            <CheckboxGroup
              title={t.sexualOrientation || "Orientação Sexual"}
              category="sexualOrientations"
              options={[
                { value: "heterosexual", label: t.heterosexual || "Heterossexual" },
                { value: "homosexual", label: t.homosexual || "Homossexual" },
                { value: "bisexual", label: t.bisexual || "Bissexual" },
                { value: "other", label: t.other || "Outro" }
              ]}
            />

            {/* Faixa de Renda */}
            <CheckboxGroup
              title={t.incomeRange || "Faixa de Renda"}
              category="incomeRanges"
              options={[
                { value: "income1", label: t.income1 || "Até 1 mil dólares por mês" },
                { value: "income2", label: t.income2 || "De 1 mil a 2 mil dólares por mês" },
                { value: "income3", label: t.income3 || "Mais de 2 mil dólares por mês" }
              ]}
            />

            {/* Visão Política */}
            <CheckboxGroup
              title={t.politicalView || "Visão Política"}
              category="politicalViews"
              options={[
                { value: "right", label: t.right || "Direita" },
                { value: "left", label: t.left || "Esquerda" },
                { value: "center", label: t.center || "Centro" },
                { value: "none", label: t.none || "Nenhum" }
              ]}
            />

            {/* Objetivo */}
            <CheckboxGroup
              title={t.objective || "Objetivo"}
              category="objectives"
              options={[
                { value: "seriousRelationship", label: t.seriousRelationship || "Relacionamento sério" },
                { value: "colorfulFriendship", label: t.colorfulFriendship || "Amizade colorida" },
                { value: "casual", label: t.casual || "Algo mais casual" }
              ]}
            />

            {/* Estado Civil */}
            <CheckboxGroup
              title={t.maritalStatus || "Estado Civil"}
              category="maritalStatuses"
              options={[
                { value: "single", label: t.single || "Solteiro" },
                { value: "divorced", label: t.divorced || "Divorciado" },
                { value: "widowed", label: t.widowed || "Viúvo" },
                { value: "married", label: t.married || "Casado" }
              ]}
            />

            {/* Escolaridade */}
            <CheckboxGroup
              title={t.education || "Escolaridade"}
              category="educations"
              options={[
                { value: "highSchoolOrLess", label: t.highSchoolOrLess || "Ensino Médio (ou menos)" },
                { value: "bachelor", label: t.bachelor || "Graduação" },
                { value: "postGraduate", label: t.postGraduate || "Pós-Graduação" }
              ]}
            />

            {/* Tipo Físico */}
            <CheckboxGroup
              title={t.bodyType || "Tipo Físico"}
              category="bodyTypes"
              options={[
                { value: "slim", label: t.slim || "Magro" },
                { value: "athletic", label: t.athletic || "Atlético ou em forma" },
                { value: "muscular", label: t.muscular || "Musculoso" },
                { value: "curvy", label: t.curvy || "Curvilíneo" },
                { value: "average", label: t.average || "Normal ou Mediano" },
                { value: "plusSize", label: t.plusSize || "Gordo ou Plus size" }
              ]}
            />

            {/* Religião */}
            <CheckboxGroup
              title={t.religion || "Religião"}
              category="religions"
              options={[
                { value: "catholicChristian", label: t.catholicChristian || "Cristão católico" },
                { value: "protestantChristian", label: t.protestantChristian || "Cristão protestante" },
                { value: "islam", label: t.islam || "Islamismo" },
                { value: "hinduism", label: t.hinduism || "Hinduísmo" },
                { value: "buddhism", label: t.buddhism || "Budismo" },
                { value: "judaism", label: t.judaism || "Judaísmo" },
                { value: "spiritism", label: t.spiritism || "Espiritismo" },
                { value: "noneOrOther", label: t.noneOrOther || "Nenhum (ou outra)" }
              ]}
            />

            {/* Altura */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t.height || "Altura"} (cm)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">{t.from || "De"}</label>
                  <input
                    type="number"
                    value={preferences.heightMin}
                    onChange={(e) => handleRangeChange("heightMin", e.target.value)}
                    min={57}
                    max={251}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">{t.to || "Até"}</label>
                  <input
                    type="number"
                    value={preferences.heightMax}
                    onChange={(e) => handleRangeChange("heightMax", e.target.value)}
                    min={57}
                    max={251}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            {/* Idade */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t.age || "Idade"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">{t.from || "De"}</label>
                  <input
                    type="number"
                    value={preferences.ageMin}
                    onChange={(e) => handleRangeChange("ageMin", e.target.value)}
                    min={18}
                    max={100}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">{t.to || "Até"}</label>
                  <input
                    type="number"
                    value={preferences.ageMax}
                    onChange={(e) => handleRangeChange("ageMax", e.target.value)}
                    min={18}
                    max={100}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            {/* Distância */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t.maxDistance || "Distância Máxima"} (km)
              </h3>
              <input
                type="range"
                value={preferences.maxDistance}
                onChange={(e) => handleRangeChange("maxDistance", e.target.value)}
                min={1}
                max={500}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 km</span>
                <span className="font-bold text-teal-600">{preferences.maxDistance} km</span>
                <span>500 km</span>
              </div>
            </div>

            {/* Botão Salvar */}
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
            >
              <Save className="w-6 h-6" />
              {t.savePreferences || "Salvar Preferências"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
