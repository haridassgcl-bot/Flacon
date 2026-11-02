import React, { useState } from 'react';
import { Send, CheckCheck, MessageSquare, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { MOCK_LISTINGS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const MessagesPage: React.FC = () => {
  const { user, setAuthModalOpen } = useAuth();

  const [activeThreadId, setActiveThreadId] = useState('t1');
  const [inputText, setInputText] = useState('');

  const [threads, setThreads] = useState([
    {
      id: 't1',
      listing: MOCK_LISTINGS[0], // Hyundai Creta
      seller: 'Karthik Raja',
      unread: 1,
      messages: [
        { id: 1, sender: 'seller', text: 'Vanakkam! Yes, the Hyundai Creta is available for inspection at Anna Nagar.', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Is the service record up to date with Hyundai OMR?', time: '10:32 AM' },
        { id: 3, sender: 'seller', text: 'Yes, full authorized dealer records are available. You can test drive tomorrow morning.', time: '10:35 AM' }
      ]
    },
    {
      id: 't2',
      listing: MOCK_LISTINGS[1], // iPhone 15 Pro Max
      seller: 'Suresh Kumar',
      unread: 0,
      messages: [
        { id: 1, sender: 'me', text: 'Hi Suresh, is the price of ₹94,000 slightly negotiable?', time: 'Yesterday' },
        { id: 2, sender: 'seller', text: 'It comes with official AppleCare until Jan 2027. I can offer ₹92,000 for direct pickup in RS Puram.', time: 'Yesterday' }
      ]
    }
  ]);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      time: 'Just now'
    };

    setThreads(prev => prev.map(t => {
      if (t.id !== activeThreadId) return t;
      return {
        ...t,
        messages: [...t.messages, newMsg]
      };
    }));

    setInputText('');

    // Simulate instant seller reply after 1.5 seconds
    setTimeout(() => {
      setThreads(prev => prev.map(t => {
        if (t.id !== activeThreadId) return t;
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: Date.now() + 1,
              sender: 'seller',
              text: 'Thanks for reaching out! You can also message me directly on WhatsApp or call my verified phone.',
              time: 'Just now'
            }
          ]
        };
      }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Buyer & Seller Messages</h1>
        <p className="text-xs text-gray-500 mt-1">
          Direct, encrypted real-time communications for verified local deals.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[600px]">
        
        {/* Left Thread List */}
        <div className="border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-100 bg-gray-50/70 font-bold text-xs uppercase tracking-wider text-gray-600">
            Active Chats ({threads.length})
          </div>
          <div className="divide-y divide-gray-100">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`w-full p-4 text-left flex items-start gap-3 transition ${
                  activeThreadId === t.id ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={t.listing.image}
                  alt={t.listing.title}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">{t.seller}</span>
                    <span className="text-[10px] text-gray-400">Today</span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-700 truncate mt-0.5">
                    {t.listing.title}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {t.messages[t.messages.length - 1].text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Window */}
        <div className="md:col-span-2 flex flex-col justify-between bg-slate-50">
          
          {/* Thread Header (Listing preview + Call CTA) */}
          <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center">
                {activeThread.seller.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{activeThread.seller}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activeThread.listing.locality}, {activeThread.listing.district}</span>
                  <span>• ₹{activeThread.listing.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${activeThread.listing.phone}`}
              className="hidden sm:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{activeThread.listing.phone}</span>
            </a>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {activeThread.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-sm ${
                    isMe ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-gray-200 rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                      isMe ? 'text-emerald-100' : 'text-gray-400'
                    }`}>
                      <span>{m.time}</span>
                      {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message to seller..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition shadow"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

