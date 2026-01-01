"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Upload, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

export default function FotosPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<(string | null)[]>([null, null, null, null, null]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalPhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...additionalPhotos];
        newPhotos[index] = reader.result as string;
        setAdditionalPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...additionalPhotos];
    newPhotos[index] = null;
    setAdditionalPhotos(newPhotos);
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
  };

  const handleSave = () => {
    if (!profilePhoto) {
      alert(t.profilePhotoRequired || "A foto de perfil é obrigatória!");
      return;
    }
    alert(t.photosSaved || "Fotos salvas com sucesso!");
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
            {t.photos || "Fotos"}
          </span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
            {t.managePhotos || "Gerenciar Fotos"}
          </h2>
          <p className="text-gray-600 mb-8">
            {t.photosDescription || "Adicione sua foto de perfil (obrigatória) e até 5 fotos adicionais"}
          </p>

          {/* Profile Photo */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-teal-600" />
              {t.profilePhoto || "Foto de Perfil"} <span className="text-red-500">*</span>
            </h3>
            
            <div className="flex justify-center">
              <div className="relative">
                {profilePhoto ? (
                  <div className="relative group">
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-48 h-48 rounded-full object-cover border-4 border-teal-400 shadow-lg"
                    />
                    <button
                      onClick={removeProfilePhoto}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 right-2 p-2 bg-green-500 text-white rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  <label className="w-48 h-48 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 border-4 border-dashed border-teal-400 flex flex-col items-center justify-center cursor-pointer hover:from-teal-200 hover:to-blue-200 transition-all">
                    <Camera className="w-12 h-12 text-teal-600 mb-2" />
                    <span className="text-sm text-gray-600 text-center px-4">
                      {t.addProfilePhoto || "Adicionar foto de perfil"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Additional Photos */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-teal-600" />
              {t.additionalPhotos || "Fotos Adicionais"} <span className="text-gray-500 text-sm">(opcional - até 5)</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {additionalPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  {photo ? (
                    <div className="relative group">
                      <img
                        src={photo}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-40 rounded-lg object-cover border-2 border-gray-300 shadow-md"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-40 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-all">
                      <Upload className="w-8 h-8 text-gray-500 mb-1" />
                      <span className="text-xs text-gray-600 text-center px-2">
                        {t.addPhoto || "Adicionar"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAdditionalPhotoUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200">
            <p className="text-sm text-gray-700">
              <strong className="text-teal-600">{t.tip || "Dica"}:</strong> {t.photoTip || "Use fotos claras e recentes. A foto de perfil é obrigatória e será a primeira que outros usuários verão!"}
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
          >
            <Check className="w-6 h-6" />
            {t.savePhotos || "Salvar Fotos"}
          </button>
        </div>
      </div>
    </div>
  );
}
