import axios from 'axios';
import { useState, useRef } from 'react';
import ProductCard from './ProductCard';

import './Chatbot.css';

const Chatbot = () => {
    const [matchedProducts, setMatchedProducts] = useState([]);
    const [messages, setMessages] = useState([
        {
        sender: 'bot',
        text: "Hi! I'm your shopping assistant today. How can I help you?",
        },
    ]);
    const [botTyping, setBotTyping] = useState(false);

    const [input, setInput] = useState('');
    const [recording, setRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');

            try {
                const response = await axios.post('http://localhost:8000/api/transcribe/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const transcribedText = response.data.transcription;
                setTranscription(transcribedText); // Still set if you want to use it elsewhere
                setInput(transcribedText); // This puts it into the input box
                // sendMessage(transcribedText);
            } catch (error) {
                console.error(error);
                setTranscription('⚠️ Error during transcription.');
            }

            audioChunksRef.current = [];
        };


        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
        }
    };
    const sendMessage = async (msg = input) => {
        if (!msg.trim()) return;

        const userMessage = { sender: 'user', text: msg };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setTranscription('');
        setBotTyping(true);

        try {
            const res = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg }),
            });

            const data = await res.json();
            const botReply = { sender: 'bot', text: data.reply };
            setMessages((prev) => [...prev, botReply]);
            setMatchedProducts(data.products);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, I couldn't process that." }]);
        }
        setBotTyping(false);
    };

    const handleSend = () => sendMessage();


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };
    const handleAddToCart = async (productId) => {
        try {
            await fetch('http://localhost:8000/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 }),
            });
            alert('Added to cart!');
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };


    return (
        <div className="chatbot">
        <div className='Top-bar'>
        <span className="topbar-title">Shopping Assistant</span>
        <button className="cart-btn">Cart</button>
        </div>

        <div className="chats">
        {messages.map((msg, idx) => (
            <div
            key={idx}
            className={`chat-row ${msg.sender === 'user' ? 'chat-user' : 'chat-bot'}`}
            >
            {/* Only for bot messages: show text and products in the same bubble */}
            {msg.sender === 'bot' && idx === messages.length - 1 && matchedProducts.length > 0 ? (
                <div className="chat-bubble bot product-bubble">
                <div>{msg.text}</div>
                <div className="matched-products-row" style={{ marginTop: '0.5rem' }}>
                    {matchedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
                </div>
            ) : (
                <div className={`chat-bubble ${msg.sender}`}>{msg.text}</div>
            )}
            </div>
        ))}
        {botTyping && (
            <div className="chat-row chat-bot">
            <div className="chat-bubble bot">Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>
            </div>
        )}
        </div>


        <div className="input-row">
            <input
            type="text"
            value = {input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Tell what you want to shop today..."
            />
            {recording && (
                <div className="recording-indicator">
                🔴 Recording...
                </div>
            )}
            <button onClick={handleSend}>Send</button>
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? '⏹️ Stop' : '🎙️ Record'}
            </button>

        </div>
        </div>
    );
};

export default Chatbot;
