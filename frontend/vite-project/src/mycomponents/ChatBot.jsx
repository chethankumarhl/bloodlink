import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react';

const BloodLinkChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your BloodLink AI assistant. I'm here to help you with questions about blood donation, eligibility, medical information, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Real Gemini API call with updated models
  const callGeminiAPI = async (userMessage) => {
    // Access the API key from environment variables
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    // Basic validation for the API key
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_ACTUAL_GEMINI_API_KEY_HERE') {
      console.error('Error: Gemini API key is not set or is invalid.');
      throw new Error('Please set your Gemini API key in your .env file as VITE_GEMINI_API_KEY.');
    }

    // Updated model endpoints based on your available models - prioritizing the best ones
    const modelEndpoints = [
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
    ];

    const prompt = `You are a specialized AI assistant for BloodLink, a blood donation platform in India.

    IMPORTANT GUIDELINES:
    - Provide accurate, helpful information about blood donation, eligibility, and general health topics.
    - Keep responses concise but informative (2-3 paragraphs max).
    - Always recommend consulting healthcare professionals for specific medical conditions.
    - Focus on blood donation safety, eligibility, and process.
    - If asked about serious medical symptoms, emphasize seeking immediate medical attention.
    - Include relevant Indian blood donation guidelines when applicable.

    User question: ${userMessage}

    Please provide a helpful, accurate, short response:`;

    // Try each model endpoint with appropriate configuration
    for (let i = 0; i < modelEndpoints.length; i++) {
      try {
        console.log(`Trying model endpoint ${i + 1}: ${modelEndpoints[i]}`);
        
        // Determine max output tokens based on model
        let maxOutputTokens = 1024;
        if (modelEndpoints[i].includes('2.5-pro') || modelEndpoints[i].includes('2.5-flash')) {
          maxOutputTokens = 2048; // Higher limit for newer models
        }

        const requestBody = {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: modelEndpoints[i].includes('2.5-') ? 64 : 40, // Use higher topK for 2.5 models
            topP: 0.95,
            maxOutputTokens: maxOutputTokens,
          }
        };
        
        const response = await fetch(`${modelEndpoints[i]}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(`Model ${i + 1} failed:`, errorData);
          
          // If this is the last model, throw the error
          if (i === modelEndpoints.length - 1) {
            if (response.status === 403 || response.status === 401) {
              throw new Error('Authentication error: Check your API key and its permissions.');
            } else if (response.status === 429) {
              throw new Error('Rate limit exceeded: Please try again in a moment.');
            } else if (response.status === 400) {
              throw new Error('Invalid request: Please check your API configuration.');
            } else {
              throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }
          }
          // Continue to next model
          continue;
        }

        const data = await response.json();
        console.log('API Response successful with model:', modelEndpoints[i]);

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
          return data.candidates[0].content.parts[0].text;
        } else {
          console.warn('Unexpected response structure:', data);
          if (i === modelEndpoints.length - 1) {
            throw new Error('Could not parse Gemini API response. Please try again.');
          }
          continue;
        }
      } catch (error) {
        console.error(`Model ${i + 1} error:`, error);
        if (i === modelEndpoints.length - 1) {
          throw error; // Re-throw if this is the last model
        }
        // Continue to next model
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await callGeminiAPI(userMessage.text);
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble providing a response right now. Please try again in a moment, or contact our support team for immediate assistance with blood donation questions.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat with AI message bubble */}
        <div className="mb-3 relative">
          <div className="bg-red-500 text-white rounded-lg px-4 py-2 shadow-lg animate-bounce">
            <p className="text-sm font-medium whitespace-nowrap">
              💬 Chat with AI
            </p>
          </div>
          {/* Message bubble tail/arrow pointing down-right */}
          <div className="absolute -bottom-1 right-3 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-red-500"></div>
        </div>

        {/* Chat button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col">
      {/* Header */}
      <div className="bg-red-500 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <div>
            <h3 className="font-semibold">BloodLink AI Assistant</h3>
            <p className="text-xs opacity-90">Ask me about blood donation</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-red-600 p-1 rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isBot ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {message.isBot ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-red-500 text-white'
              }`}>
                <p className="text-sm leading-relaxed">
                  {formatMessage(message.text)}
                </p>
                <p className={`text-xs mt-1 ${
                  message.isBot ? 'text-gray-500' : 'text-red-100'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-red-500" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-600 mb-2">💬 Try asking me:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Am I eligible to donate blood?",
                "What's my blood type compatibility?",
                "How often can I donate?",
                "What happens during donation?"
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-xs px-3 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors border border-red-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about blood donation..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This AI provides general information. For medical advice, consult healthcare professionals.
        </p>
      </div>
    </div>
  );
};

export default BloodLinkChatbot;