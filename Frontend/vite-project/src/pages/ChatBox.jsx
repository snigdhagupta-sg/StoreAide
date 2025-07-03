import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Upload, FileText, CheckCircle, Camera, Sparkles, TrendingUp, Receipt, Bot, User, Zap, FileCheck, DollarSign, Calendar, Hash, ArrowUpRight, ArrowDownLeft, MessageCircle, Cpu, X } from 'lucide-react';

const ChatBox = ({ setCurrentPage }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { 
            sender: 'bot', 
            text: 'Welcome to **Transaction Wizard**! 🚀\n\n• Upload your bank statements or receipts\n• Get instant transaction extraction\n• AI-powered document analysis\n\nReady to get started?',
            timestamp: new Date()
        }
    ]);
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Text formatting function
    const formatText = (text) => {
        if (!text) return '';
        
        // Split by newlines to handle line breaks
        const lines = text.split('\n');
        
        return lines.map((line, lineIndex) => {
            // Handle bullet points
            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                const bulletText = line.replace(/^[\s]*[•-][\s]*/, '');
                return (
                    <div key={lineIndex} className="flex items-start gap-2 my-1">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{formatInlineText(bulletText)}</span>
                    </div>
                );
            }
            
            // Handle numbered lists
            if (/^\d+\./.test(line.trim())) {
                const match = line.match(/^(\s*)(\d+\.\s*)(.*)/);
                if (match) {
                    const [, indent, number, text] = match;
                    return (
                        <div key={lineIndex} className="flex items-start gap-2 my-1">
                            <span className="text-blue-400 font-medium">{number}</span>
                            <span>{formatInlineText(text)}</span>
                        </div>
                    );
                }
            }
            
            // Regular lines
            if (line.trim()) {
                return (
                    <div key={lineIndex} className="my-1">
                        {formatInlineText(line)}
                    </div>
                );
            }
            
            // Empty lines
            return <div key={lineIndex} className="h-2"></div>;
        });
    };

    // Format inline text (bold, italic, etc.)
    const formatInlineText = (text) => {
        const parts = [];
        let currentIndex = 0;
        
        // Handle **bold** text
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        
        while ((match = boldRegex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > currentIndex) {
                parts.push(text.slice(currentIndex, match.index));
            }
            
            // Add bold text
            parts.push(<strong key={match.index} className="font-semibold text-white">{match[1]}</strong>);
            currentIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (currentIndex < text.length) {
            parts.push(text.slice(currentIndex));
        }
        
        return parts.length > 0 ? parts : text;
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { 
            sender: 'user', 
            text: input, 
            timestamp: new Date()
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const res = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_input: input }),
            });

            const data = await res.json();
            
            setTimeout(() => {
                const botMessage = { 
                    sender: 'bot', 
                    text: data.reply,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, botMessage]);
                setIsTyping(false);
            }, 1000);
        } catch (err) {
            console.error('Error:', err);
            setIsTyping(false);
            const errorMessage = { 
                sender: 'bot', 
                text: '❌ **Error occurred!** Please try again.',
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setInput('');
    };

    const sendImage = async () => {
        if (!image) return;
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', image);

        try {
            const userMessage = { 
                sender: 'user', 
                text: `📄 **Document uploaded:** ${image.name}`,
                timestamp: new Date(),
                isFile: true
            };
            setMessages((prev) => [...prev, userMessage]);

            const processingMessage = { 
                sender: 'bot', 
                text: '🔍 **Analyzing document...**\n\n• Extracting text using OCR\n• Processing transaction data\n• Preparing results',
                timestamp: new Date(),
                isProcessing: true
            };
            setMessages((prev) => [...prev, processingMessage]);

            // Step 1: Extract text using OCR
            const res1 = await fetch('http://localhost:8000/extract_text/', {
                method: 'POST',
                body: formData,
            });

            const { extracted_text } = await res1.json();

            // Step 2: Send text to Gemini for transaction extraction
            const res2 = await fetch('http://localhost:8000/return_transactions/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: extracted_text }),
            });
            
            let data2 = await res2.json();
            
            if (typeof data2 === "string") {
                data2 = data2.replace(/```json|```/g, "").trim();
            }

            const parsedTransactions = JSON.parse(data2);

            // Step 3: Insert in db
            const res3 = await fetch('http://localhost:8000/upload_transactions/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedTransactions),
                credentials: 'include'
            });
            
            const data3 = await res3.json();

            setTimeout(() => {
                const botMessage = {
                    sender: 'bot',
                    text: `✅ **Processing Complete!**\n\n**${data3.inserted_count} transaction(s) processed successfully**\n\nTransactions have been added to your database.`,
                    timestamp: new Date(),
                    isSuccess: true,
                    transactions: data3.inserted_transactions
                };
                setMessages((prev) => [...prev, botMessage]);
            }, 2000);

        } catch (err) {
            console.error('Image upload error:', err);
            const errorMessage = { 
                sender: 'bot', 
                text: '❌ **Processing failed!**\n\n• Please ensure the image is clear\n• Try uploading again\n• Contact support if issue persists',
                timestamp: new Date(),
                isError: true
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setImage(null);
        setIsUploading(false);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const TransactionCard = ({ transaction }) => {
        const isCredit = transaction.credited_debited === 'credited';
        return (
            <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isCredit 
                    ? 'bg-emerald-500/10 border-emerald-400/30 hover:bg-emerald-500/20' 
                    : 'bg-red-500/10 border-red-400/30 hover:bg-red-500/20'
            }`}>
                <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCredit ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}>
                        {isCredit ? 
                            <ArrowDownLeft size={18} className="text-emerald-400" /> : 
                            <ArrowUpRight size={18} className="text-red-400" />
                        }
                    </div>
                    <div className="text-right">
                        <div className={`text-2xl font-bold ${isCredit ? 'text-emerald-300' : 'text-red-300'}`}>
                            ₹{transaction.amount}
                        </div>
                        <div className={`text-xs ${isCredit ? 'text-emerald-400' : 'text-red-400'}`}>
                            {transaction.credited_debited.toUpperCase()}
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={14} />
                        <span>{transaction.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <User size={14} />
                        <span>{isCredit ? 'From' : 'To'}: {transaction.to_from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Hash size={14} />
                        <span className="font-mono text-xs">{transaction.reference_number}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
            {/* Header */}
            <div className="flex-shrink-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 p-4">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <button 
                        onClick={() => setCurrentPage('home')} 
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                        <ArrowLeft size={18} /> 
                        <span>Back</span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Cpu size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Transaction Wizard</h1>
                            <p className="text-xs text-gray-400">AI-powered document processing</p>
                        </div>
                    </div>
                    
                    <div className="w-20"></div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto p-4 pb-32">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className="max-w-2xl">
                                    {/* Avatar and Name */}
                                    <div className={`flex items-center gap-2 mb-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            msg.sender === 'user' 
                                                ? 'bg-blue-600' 
                                                : 'bg-gradient-to-br from-purple-500 to-pink-500'
                                        }`}>
                                            {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {msg.sender === 'user' ? 'You' : 'Assistant'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {formatTime(msg.timestamp)}
                                        </span>
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                                        msg.sender === 'user' 
                                            ? 'bg-blue-600/90 text-white' 
                                            : msg.isSuccess
                                            ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30'
                                            : msg.isError
                                            ? 'bg-red-500/20 text-red-100 border border-red-500/30'
                                            : 'bg-gray-800/50 text-gray-100 border border-gray-700/30'
                                    }`}>
                                        
                                        {/* Processing Indicator */}
                                        {msg.isProcessing && (
                                            <div className="flex items-center gap-2 mb-3 p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                                <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                                                <span className="text-sm font-medium text-blue-200">Processing...</span>
                                            </div>
                                        )}

                                        {/* Formatted Message Text */}
                                        <div className="text-sm leading-relaxed">
                                            {formatText(msg.text)}
                                        </div>

                                        {/* Transaction Cards */}
                                        {msg.transactions && msg.transactions.length > 0 && (
                                            <div className="mt-4 space-y-3">
                                                <div className="text-sm font-medium text-gray-300 mb-3">
                                                    📊 **Extracted Transactions:**
                                                </div>
                                                {msg.transactions.map((transaction, i) => (
                                                    <TransactionCard key={i} transaction={transaction} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {(isTyping || isUploading) && (
                            <div className="flex justify-start">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            <Bot size={16} />
                                        </div>
                                        <span className="text-xs text-gray-400">Assistant</span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700/30">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                                            </div>
                                            <span className="text-sm text-gray-300">
                                                {isUploading ? 'Processing document...' : 'Thinking...'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Fixed Input Area */}
            <div className="flex-shrink-0 fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 p-4">
                <div className="max-w-4xl mx-auto">
                    {/* File Upload Status */}
                    {image && (
                        <div className="mb-4 p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <FileText size={18} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-200">{image.name}</p>
                                        <p className="text-xs text-gray-400">Ready to upload</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setImage(null)}
                                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Input Row */}
                    <div className="flex gap-3 mb-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Type your message or upload a document..."
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                            />
                        </div>
                        
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:opacity-50 rounded-xl font-medium transition-all duration-200 hover:scale-105 disabled:scale-100 flex items-center gap-2 text-white"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;