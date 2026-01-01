"use client";

import { useState, useEffect } from "react";
import { translations } from "../../lib/translations";

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

export default function CadastroPage() {
  const [language, setLanguage] = useState("en");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Passo 1 - Privado
    email: "",
    birthDate: "",
    
    // Passo 2 - Público
    nickname: "",
    country: "",
    
    // Passo 3 - Público
    gender: "",
    sexualOrientation: "",
    
    // Passo 4 - Público
    incomeRange: "",
    politicalView: "",
    objective: "",
    maritalStatus: "",
    education: "",
    bodyType: "",
    height: "",
    religion: "",
    
    // Passo 5 - Público
    biography: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validações específicas
    if (name === "nickname" && value.length > 15) return;
    if (name === "country" && value.length > 30) return;
    if (name === "height") {
      const heightNum = parseInt(value);
      if (value && (heightNum < 57 || heightNum > 251)) return;
    }
    if (name === "biography" && value.length > 250) return;
    
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validateStep = (currentStep: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (currentStep === 1) {
      if (!formData.email) newErrors.email = t.requiredField || "Campo obrigatório";
      if (!formData.birthDate) newErrors.birthDate = t.requiredField || "Campo obrigatório";
      
      if (formData.birthDate) {
        const age = calculateAge(formData.birthDate);
        if (age < 18) {
          newErrors.birthDate = t.mustBe18 || "Você deve ter pelo menos 18 anos";
        }
      }
    }
    
    if (currentStep === 2) {
      if (!formData.nickname || formData.nickname.length < 1) {
        newErrors.nickname = t.requiredField || "Campo obrigatório";
      }
      if (!formData.country) newErrors.country = t.requiredField || "Campo obrigatório";
    }
    
    if (currentStep === 3) {
      if (!formData.gender) newErrors.gender = t.requiredField || "Campo obrigatório";
      if (!formData.sexualOrientation) newErrors.sexualOrientation = t.requiredField || "Campo obrigatório";
    }
    
    if (currentStep === 4) {
      if (!formData.incomeRange) newErrors.incomeRange = t.requiredField || "Campo obrigatório";
      if (!formData.politicalView) newErrors.politicalView = t.requiredField || "Campo obrigatório";
      if (!formData.objective) newErrors.objective = t.requiredField || "Campo obrigatório";
      if (!formData.maritalStatus) newErrors.maritalStatus = t.requiredField || "Campo obrigatório";
      if (!formData.education) newErrors.education = t.requiredField || "Campo obrigatório";
      if (!formData.bodyType) newErrors.bodyType = t.requiredField || "Campo obrigatório";
      if (!formData.height) newErrors.height = t.requiredField || "Campo obrigatório";
      if (!formData.religion) newErrors.religion = t.requiredField || "Campo obrigatório";
    }
    
    if (currentStep === 5) {
      if (!formData.biography || formData.biography.length < 1) {
        newErrors.biography = t.requiredField || "Campo obrigatório";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateStep(5)) {
      alert(t.registrationComplete || "Cadastro concluído!");
      console.log("Dados do cadastro:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-cyan-100">
      {/* Header - Visível em todos os passos */}
      <div className="flex justify-between items-center p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="text-2xl sm:text-3xl font-bold">
          <span className="bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">Kiss Me </span>
          <span className="text-[#8B0000]">💋</span>
          <span className="bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent"> Best Date App</span>
        </div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all text-sm sm:text-base"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              🌐 {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= num 
                  ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {num}
              </div>
              <span className="text-xs mt-1 text-gray-600">{t[`step${num}` as keyof typeof t] || `Passo ${num}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* PASSO 1 - Informações Privadas */}
        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
              {t.step1Title || "Passo 1"}
            </h2>
            <p className="text-sm text-gray-600 mb-6 italic">
              {t.step1PrivacyNotice || "As informações do Passo 1 não serão visualizadas pelo público."}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email || "E-mail principal"} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.emailPlaceholder || "seu@email.com"}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.birthDate || "Data de nascimento"} *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button 
                onClick={nextStep} 
                className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {t.next || "Próximo"}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 2 - Informações Públicas Básicas */}
        {step === 2 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
              {t.step2Title || "Passo 2"}
            </h2>
            <p className="text-sm text-gray-600 mb-6 italic">
              {t.step2to5PublicNotice || "As informações do Passo 2 ao Passo 5 serão sim visualizadas pelo público."}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.nickname || "Nome ou apelido"} * <span className="text-xs text-gray-500">(1-15 caracteres)</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder={t.nicknamePlaceholder || "Como quer ser chamado(a)?"}
                  maxLength={15}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.nickname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.nickname.length}/15</p>
                {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.country || "País"} * <span className="text-xs text-gray-500">(máx. 30 caracteres)</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder={t.countryPlaceholder || "Seu país"}
                  maxLength={30}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.country.length}/30</p>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                onClick={prevStep} 
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
              >
                {t.back || "Voltar"}
              </button>
              <button 
                onClick={nextStep} 
                className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {t.next || "Próximo"}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 3 - Gênero e Orientação Sexual */}
        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
              {t.step3Title || "Passo 3"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.gender || "Gênero"} *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="masculine">{t.masculine || "Masculino"}</option>
                  <option value="feminine">{t.feminine || "Feminino"}</option>
                  <option value="nonBinary">{t.nonBinary || "Não binário"}</option>
                  <option value="customInBio">{t.customInBio || "Personalizado na BIO"}</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.sexualOrientation || "Orientação sexual"} *
                </label>
                <select
                  name="sexualOrientation"
                  value={formData.sexualOrientation}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.sexualOrientation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="heterosexual">{t.heterosexual || "Heterossexual"}</option>
                  <option value="homosexual">{t.homosexual || "Homossexual"}</option>
                  <option value="bisexual">{t.bisexual || "Bissexual"}</option>
                  <option value="customInBio">{t.customInBio || "Personalizado na BIO"}</option>
                </select>
                {errors.sexualOrientation && <p className="text-red-500 text-sm mt-1">{errors.sexualOrientation}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                onClick={prevStep} 
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
              >
                {t.back || "Voltar"}
              </button>
              <button 
                onClick={nextStep} 
                className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {t.next || "Próximo"}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 4 - Informações Detalhadas */}
        {step === 4 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
              {t.step4Title || "Passo 4"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.incomeRange || "Faixa de renda"} *
                </label>
                <select
                  name="incomeRange"
                  value={formData.incomeRange}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.incomeRange ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="income1">{t.income1 || "Até 1 mil dólares por mês"}</option>
                  <option value="income2">{t.income2 || "De 1 mil dólares a 2 mil dólares por mês"}</option>
                  <option value="income3">{t.income3 || "Mais de 2 mil dólares por mês"}</option>
                </select>
                {errors.incomeRange && <p className="text-red-500 text-sm mt-1">{errors.incomeRange}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.politicalView || "Visão política"} *
                </label>
                <select
                  name="politicalView"
                  value={formData.politicalView}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.politicalView ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="right">{t.right || "Direita"}</option>
                  <option value="left">{t.left || "Esquerda"}</option>
                  <option value="center">{t.center || "Centro"}</option>
                  <option value="none">{t.none || "Nenhum"}</option>
                </select>
                {errors.politicalView && <p className="text-red-500 text-sm mt-1">{errors.politicalView}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.objective || "Objetivo"} *
                </label>
                <select
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.objective ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="seriousRelationship">{t.seriousRelationship || "Relacionamento sério"}</option>
                  <option value="colorfulFriendship">{t.colorfulFriendship || "Amizade colorida"}</option>
                  <option value="casual">{t.casual || "Algo mais casual"}</option>
                </select>
                {errors.objective && <p className="text-red-500 text-sm mt-1">{errors.objective}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.maritalStatus || "Estado civil"} *
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.maritalStatus ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="single">{t.single || "Solteiro"}</option>
                  <option value="divorced">{t.divorced || "Divorciado"}</option>
                  <option value="widowed">{t.widowed || "Viúvo"}</option>
                  <option value="married">{t.married || "Casado"}</option>
                </select>
                {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.education || "Escolaridade"} *
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.education ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="highSchoolOrLess">{t.highSchoolOrLess || "Ensino Médio (ou menos)"}</option>
                  <option value="bachelor">{t.bachelor || "Graduação (Bacharelado, Licenciatura, Tecnólogo)"}</option>
                  <option value="postGraduate">{t.postGraduate || "Pós-Graduação"}</option>
                </select>
                {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.bodyType || "Tipo físico"} *
                </label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.bodyType ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="slim">{t.slim || "Magro"}</option>
                  <option value="athletic">{t.athletic || "Atlético ou em forma ou definido"}</option>
                  <option value="muscular">{t.muscular || "Musculoso"}</option>
                  <option value="curvy">{t.curvy || "Curvilíneo"}</option>
                  <option value="average">{t.average || "Normal ou Mediano"}</option>
                  <option value="plusSize">{t.plusSize || "Gordo ou Plus size"}</option>
                </select>
                {errors.bodyType && <p className="text-red-500 text-sm mt-1">{errors.bodyType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.height || "Altura"} * <span className="text-xs text-gray-500">(em centímetros: 57-251)</span>
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="170"
                  min={57}
                  max={251}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.height ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.religion || "Religião"} *
                </label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 ${
                    errors.religion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{t.selectOption || "Selecione..."}</option>
                  <option value="catholicChristian">{t.catholicChristian || "Cristão católico"}</option>
                  <option value="protestantChristian">{t.protestantChristian || "Cristão protestante"}</option>
                  <option value="islam">{t.islam || "Islamismo"}</option>
                  <option value="hinduism">{t.hinduism || "Hinduísmo"}</option>
                  <option value="buddhism">{t.buddhism || "Budismo"}</option>
                  <option value="judaism">{t.judaism || "Judaísmo"}</option>
                  <option value="spiritism">{t.spiritism || "Espiritismo"}</option>
                  <option value="noneOrOther">{t.noneOrOther || "Nenhum (ou outra)"}</option>
                </select>
                {errors.religion && <p className="text-red-500 text-sm mt-1">{errors.religion}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                onClick={prevStep} 
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
              >
                {t.back || "Voltar"}
              </button>
              <button 
                onClick={nextStep} 
                className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {t.next || "Próximo"}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 5 - Biografia */}
        {step === 5 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
              {t.step5Title || "Passo 5"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.biography || "Biografia"} * <span className="text-xs text-gray-500">(1-250 caracteres)</span>
                </label>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  placeholder={t.biographyPlaceholder || "Conte um pouco sobre você..."}
                  maxLength={250}
                  rows={6}
                  className={`w-full p-3 border-2 rounded-lg transition-all focus:ring-2 focus:ring-teal-400 resize-none ${
                    errors.biography ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.biography.length}/250</p>
                {errors.biography && <p className="text-red-500 text-sm mt-1">{errors.biography}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                onClick={prevStep} 
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
              >
                {t.back || "Voltar"}
              </button>
              <button 
                onClick={handleSubmit} 
                className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {t.finish || "Finalizar Cadastro"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
