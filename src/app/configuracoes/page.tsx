"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("usuario@email.com");
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [plan, setPlan] = useState("Premium");
  const [paymentDate, setPaymentDate] = useState("2024-01-15");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSave = () => {
    setIsEditing(false);
    alert(t.changesSaved || "Alterações salvas com sucesso!");
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
            {t.settings || "Configurações"}
          </span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
            {t.accountSettings || "Configurações da Conta"}
          </h2>

          <div className="space-y-6">
            {/* Plano */}
            <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.currentPlan || "Plano Atual"}
              </label>
              <p className="text-2xl font-bold text-teal-600">{plan}</p>
            </div>

            {/* Data de Pagamento */}
            <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.lastPayment || "Último Pagamento"}
              </label>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(paymentDate).toLocaleDateString()}
              </p>
            </div>

            {/* Data de Nascimento - NÃO EDITÁVEL */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.birthDate || "Data de Nascimento"}
              </label>
              <p className="text-lg font-semibold text-gray-600">
                {new Date(birthDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-1 italic">
                {t.cannotBeChanged || "Este campo não pode ser alterado"}
              </p>
            </div>

            {/* E-mail - EDITÁVEL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email || "E-mail Principal"}
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-2 border-teal-400 rounded-lg focus:ring-2 focus:ring-teal-400 transition-all"
                />
              ) : (
                <div className="flex items-center justify-between p-3 bg-white border-2 border-gray-300 rounded-lg">
                  <span className="text-gray-800">{email}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    {t.edit || "Editar"}
                  </button>
                </div>
              )}
            </div>

            {/* Botão Salvar */}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5" />
                  {t.save || "Salvar"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEmail("usuario@email.com");
                  }}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
                >
                  {t.cancel || "Cancelar"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
