"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

export default function PerfilPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados do perfil (Passos 2 ao 5)
  const [profileData, setProfileData] = useState({
    nickname: "João",
    country: "Brasil",
    gender: "masculine",
    sexualOrientation: "heterosexual",
    incomeRange: "income2",
    politicalView: "center",
    objective: "seriousRelationship",
    maritalStatus: "single",
    education: "bachelor",
    bodyType: "athletic",
    height: "175",
    religion: "catholicChristian",
    biography: "Adoro viajar, conhecer novas culturas e fazer novos amigos. Procuro alguém especial para compartilhar momentos inesquecíveis."
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "nickname" && value.length > 15) return;
    if (name === "country" && value.length > 30) return;
    if (name === "height") {
      const heightNum = parseInt(value);
      if (value && (heightNum < 57 || heightNum > 251)) return;
    }
    if (name === "biography" && value.length > 250) return;
    
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert(t.profileUpdated || "Perfil atualizado com sucesso!");
  };

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
            {t.profile || "Meu Perfil"}
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all"
        >
          <Edit2 className="w-4 h-4" />
          {isEditing ? (t.cancel || "Cancelar") : (t.edit || "Editar")}
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-400 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
              {profileData.nickname.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-3xl font-bold mt-4 text-gray-800">{profileData.nickname}</h2>
            <p className="text-gray-600">{profileData.country}</p>
          </div>

          <div className="space-y-6">
            {/* Passo 2 - Informações Básicas */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-teal-600 mb-4">{t.basicInfo || "Informações Básicas"}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.nickname || "Nome/Apelido"}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nickname"
                      value={profileData.nickname}
                      onChange={handleInputChange}
                      maxLength={15}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{profileData.nickname}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.country || "País"}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleInputChange}
                      maxLength={30}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{profileData.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Passo 3 - Identidade */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-teal-600 mb-4">{t.identity || "Identidade"}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.gender || "Gênero"}
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="masculine">{t.masculine || "Masculino"}</option>
                      <option value="feminine">{t.feminine || "Feminino"}</option>
                      <option value="nonBinary">{t.nonBinary || "Não binário"}</option>
                      <option value="customInBio">{t.customInBio || "Personalizado na BIO"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.gender as keyof typeof t] || profileData.gender}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.sexualOrientation || "Orientação Sexual"}
                  </label>
                  {isEditing ? (
                    <select
                      name="sexualOrientation"
                      value={profileData.sexualOrientation}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="heterosexual">{t.heterosexual || "Heterossexual"}</option>
                      <option value="homosexual">{t.homosexual || "Homossexual"}</option>
                      <option value="bisexual">{t.bisexual || "Bissexual"}</option>
                      <option value="customInBio">{t.customInBio || "Personalizado na BIO"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.sexualOrientation as keyof typeof t] || profileData.sexualOrientation}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Passo 4 - Detalhes */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-teal-600 mb-4">{t.details || "Detalhes"}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.height || "Altura"} (cm)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={profileData.height}
                      onChange={handleInputChange}
                      min={57}
                      max={251}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{profileData.height} cm</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.bodyType || "Tipo Físico"}
                  </label>
                  {isEditing ? (
                    <select
                      name="bodyType"
                      value={profileData.bodyType}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="slim">{t.slim || "Magro"}</option>
                      <option value="athletic">{t.athletic || "Atlético"}</option>
                      <option value="muscular">{t.muscular || "Musculoso"}</option>
                      <option value="curvy">{t.curvy || "Curvilíneo"}</option>
                      <option value="average">{t.average || "Normal"}</option>
                      <option value="plusSize">{t.plusSize || "Plus size"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.bodyType as keyof typeof t] || profileData.bodyType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.education || "Escolaridade"}
                  </label>
                  {isEditing ? (
                    <select
                      name="education"
                      value={profileData.education}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="highSchoolOrLess">{t.highSchoolOrLess || "Ensino Médio"}</option>
                      <option value="bachelor">{t.bachelor || "Graduação"}</option>
                      <option value="postGraduate">{t.postGraduate || "Pós-Graduação"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.education as keyof typeof t] || profileData.education}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.maritalStatus || "Estado Civil"}
                  </label>
                  {isEditing ? (
                    <select
                      name="maritalStatus"
                      value={profileData.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="single">{t.single || "Solteiro"}</option>
                      <option value="divorced">{t.divorced || "Divorciado"}</option>
                      <option value="widowed">{t.widowed || "Viúvo"}</option>
                      <option value="married">{t.married || "Casado"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.maritalStatus as keyof typeof t] || profileData.maritalStatus}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.objective || "Objetivo"}
                  </label>
                  {isEditing ? (
                    <select
                      name="objective"
                      value={profileData.objective}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="seriousRelationship">{t.seriousRelationship || "Relacionamento sério"}</option>
                      <option value="colorfulFriendship">{t.colorfulFriendship || "Amizade colorida"}</option>
                      <option value="casual">{t.casual || "Casual"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.objective as keyof typeof t] || profileData.objective}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.religion || "Religião"}
                  </label>
                  {isEditing ? (
                    <select
                      name="religion"
                      value={profileData.religion}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="catholicChristian">{t.catholicChristian || "Cristão católico"}</option>
                      <option value="protestantChristian">{t.protestantChristian || "Cristão protestante"}</option>
                      <option value="islam">{t.islam || "Islamismo"}</option>
                      <option value="hinduism">{t.hinduism || "Hinduísmo"}</option>
                      <option value="buddhism">{t.buddhism || "Budismo"}</option>
                      <option value="judaism">{t.judaism || "Judaísmo"}</option>
                      <option value="spiritism">{t.spiritism || "Espiritismo"}</option>
                      <option value="noneOrOther">{t.noneOrOther || "Nenhum"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.religion as keyof typeof t] || profileData.religion}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.politicalView || "Visão Política"}
                  </label>
                  {isEditing ? (
                    <select
                      name="politicalView"
                      value={profileData.politicalView}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="right">{t.right || "Direita"}</option>
                      <option value="left">{t.left || "Esquerda"}</option>
                      <option value="center">{t.center || "Centro"}</option>
                      <option value="none">{t.none || "Nenhum"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.politicalView as keyof typeof t] || profileData.politicalView}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.incomeRange || "Faixa de Renda"}
                  </label>
                  {isEditing ? (
                    <select
                      name="incomeRange"
                      value={profileData.incomeRange}
                      onChange={handleInputChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="income1">{t.income1 || "Até 1 mil"}</option>
                      <option value="income2">{t.income2 || "1 mil a 2 mil"}</option>
                      <option value="income3">{t.income3 || "Mais de 2 mil"}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {t[profileData.incomeRange as keyof typeof t] || profileData.incomeRange}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Passo 5 - Biografia */}
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-4">{t.biography || "Biografia"}</h3>
              {isEditing ? (
                <textarea
                  name="biography"
                  value={profileData.biography}
                  onChange={handleInputChange}
                  maxLength={250}
                  rows={4}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 resize-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.biography}</p>
              )}
              {isEditing && (
                <p className="text-xs text-gray-500 mt-1">{profileData.biography.length}/250</p>
              )}
            </div>

            {/* Botão Salvar */}
            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                {t.saveChanges || "Salvar Alterações"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
