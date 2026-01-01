"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Send, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

// Dados de exemplo de matches
const mockMatches = [
  {
    id: 1,
    name: "Maria",
    photo: "M",
    lastMessage: "Oi! Tudo bem?",
    time: "10:30",
    unread: 2,
    compatibility: 95
  },
  {
    id: 2,
    name: "Ana",
    photo: "A",
    lastMessage: "Adorei seu perfil!",
    time: "Ontem",
    unread: 0,
    compatibility: 88
  },
  {
    id: 3,
    name: "Julia",
    photo: "J",
    lastMessage: "Quando podemos nos encontrar?",
    time: "2 dias",
    unread: 1,
    compatibility: 78
  }
];

const mockMessages = [
  { id: 1, sender: "other", text: "Oi! Tudo bem?", time: "10:30" },
  { id: 2, sender: "me", text: "Oi! Tudo ótimo, e você?", time: "10:32" },
  { id: 3, sender: "other", text: "Também! Vi que você gosta de viajar", time: "10:33" },
  { id: 4, sender: "me", text: "Sim! Adoro conhecer novos lugares", time: "10:35" },
  { id: 5, sender: "other", text: "Qual foi sua última viagem?", time: "10:36" }
];

export default function ChatPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
            {t.chat || "Chat"}
          </span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Matches List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-teal-400 to-blue-600">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5" fill="white" />
                {t.yourMatches || "Seus Matches"}
              </h3>
            </div>
            
            <div className="overflow-y-auto h-full">
              {mockMatches.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>{t.noMatches || "Você ainda não tem matches"}</p>
                  <p className="text-sm mt-2">{t.startSwiping || "Comece a dar likes para fazer matches!"}</p>
                </div>
              ) : (
                mockMatches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatch(match.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-teal-50 transition-all border-b border-gray-200 ${
                      selectedMatch === match.id ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {match.photo}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800">{match.name}</h4>
                        <span className="text-xs text-gray-500">{match.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{match.lastMessage}</p>
                      <p className="text-xs text-teal-600 mt-1">{match.compatibility}% {t.compatible || "compatível"}</p>
                    </div>
                    {match.unread > 0 && (
                      <div className="w-6 h-6 rounded-full bg-[#CC5500] text-white text-xs flex items-center justify-center font-bold">
                        {match.unread}
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col">
            {selectedMatch ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-gradient-to-r from-teal-400 to-blue-600 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-teal-600 text-xl font-bold">
                    {mockMatches.find(m => m.id === selectedMatch)?.photo}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {mockMatches.find(m => m.id === selectedMatch)?.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {mockMatches.find(m => m.id === selectedMatch)?.compatibility}% {t.compatible || "compatível"}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.sender === 'me'
                            ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.typeMessage || "Digite sua mensagem..."}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">{t.selectMatch || "Selecione um match para conversar"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
