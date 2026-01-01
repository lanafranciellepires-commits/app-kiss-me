"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Star, Send, ThumbsUp, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

// Dados de exemplo de pessoas com quem teve encontro
const mockMeetings = [
  {
    id: 1,
    name: "Maria",
    photo: "M",
    meetingDate: "2024-01-15",
    compatibility: 95,
    feedbackGiven: false,
    feedbackReceived: null
  },
  {
    id: 2,
    name: "Ana",
    photo: "A",
    meetingDate: "2024-01-10",
    compatibility: 88,
    feedbackGiven: true,
    feedbackReceived: {
      rating: 5,
      compliments: ["Pontual", "Educado", "Interessante"],
      suggestions: "Nenhuma sugestão, foi perfeito!",
      date: "2024-01-11"
    }
  }
];

export default function FeedbackPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [compliments, setCompliments] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const complimentOptions = [
    { value: "punctual", label: t.punctual || "Pontual" },
    { value: "polite", label: t.polite || "Educado(a)" },
    { value: "interesting", label: t.interesting || "Interessante" },
    { value: "funny", label: t.funny || "Engraçado(a)" },
    { value: "respectful", label: t.respectful || "Respeitoso(a)" },
    { value: "goodListener", label: t.goodListener || "Bom ouvinte" },
    { value: "attractive", label: t.attractive || "Atraente" },
    { value: "intelligent", label: t.intelligent || "Inteligente" }
  ];

  const handleComplimentToggle = (value: string) => {
    if (compliments.includes(value)) {
      setCompliments(compliments.filter(c => c !== value));
    } else {
      setCompliments([...compliments, value]);
    }
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      alert(t.pleaseRate || "Por favor, dê uma avaliação!");
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPerson(null);
      setRating(0);
      setCompliments([]);
      setSuggestions("");
    }, 2000);
  };

  const selectedMeeting = mockMeetings.find(m => m.id === selectedPerson);

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
            {t.feedback || "Feedback"}
          </span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meetings List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-teal-400 to-blue-600">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5" fill="white" />
                {t.yourMeetings || "Seus Encontros"}
              </h3>
            </div>
            
            <div className="p-4 space-y-3">
              {mockMeetings.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>{t.noMeetings || "Você ainda não teve encontros"}</p>
                </div>
              ) : (
                mockMeetings.map((meeting) => (
                  <button
                    key={meeting.id}
                    onClick={() => setSelectedPerson(meeting.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedPerson === meeting.id
                        ? 'border-teal-400 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {meeting.photo}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-800">{meeting.name}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(meeting.meetingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-600">{meeting.compatibility}% {t.compatible || "compatível"}</span>
                      {meeting.feedbackGiven ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {t.feedbackGiven || "Feedback enviado"}
                        </span>
                      ) : (
                        <span className="text-orange-600">{t.pendingFeedback || "Pendente"}</span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Feedback Form/View */}
          <div className="md:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            {selectedMeeting ? (
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedMeeting.photo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedMeeting.name}</h3>
                    <p className="text-gray-600">
                      {t.meeting || "Encontro"}: {new Date(selectedMeeting.meetingDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Feedback Recebido */}
                {selectedMeeting.feedbackReceived && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border-2 border-teal-200">
                    <h4 className="text-lg font-semibold text-teal-700 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      {t.feedbackReceived || "Feedback Recebido"}
                    </h4>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">{t.rating || "Avaliação"}:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${
                              star <= selectedMeeting.feedbackReceived!.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">{t.compliments || "Elogios"}:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMeeting.feedbackReceived.compliments.map((comp, idx) => (
                          <span key={idx} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t.suggestions || "Sugestões"}:</p>
                      <p className="text-gray-700 italic">"{selectedMeeting.feedbackReceived.suggestions}"</p>
                    </div>
                  </div>
                )}

                {/* Formulário de Feedback */}
                {!selectedMeeting.feedbackGiven ? (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {t.giveFeedback || "Dar Feedback"}
                    </h4>

                    {/* Rating */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.howWasMeeting || "Como foi o encontro?"} *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-all hover:scale-110"
                          >
                            <Star
                              className={`w-10 h-10 ${
                                star <= rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compliments */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.selectCompliments || "Selecione elogios"}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {complimentOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              compliments.includes(option.value)
                                ? 'border-teal-400 bg-teal-50'
                                : 'border-gray-200 hover:border-teal-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={compliments.includes(option.value)}
                              onChange={() => handleComplimentToggle(option.value)}
                              className="mr-2"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.suggestionsForImprovement || "Sugestões para melhoria"} ({t.optional || "opcional"})
                      </label>
                      <textarea
                        value={suggestions}
                        onChange={(e) => setSuggestions(e.target.value)}
                        placeholder={t.suggestionsPlaceholder || "Compartilhe sugestões construtivas..."}
                        rows={4}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmitFeedback}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                      {t.sendFeedback || "Enviar Feedback"}
                    </button>

                    {/* Info */}
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-gray-700">
                        <strong className="text-yellow-700">{t.privacy || "Privacidade"}:</strong> {t.feedbackPrivacy || "Este feedback será visível apenas para você e para a pessoa avaliada."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ThumbsUp className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {t.feedbackAlreadyGiven || "Feedback já enviado"}
                    </h4>
                    <p className="text-gray-600">
                      {t.thankYouForFeedback || "Obrigado por compartilhar sua experiência!"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center p-8">
                  <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">{t.selectMeeting || "Selecione um encontro para dar feedback"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-bounce">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t.feedbackSent || "Feedback Enviado!"}
              </h3>
              <p className="text-gray-600">
                {t.thankYou || "Obrigado por sua avaliação"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
