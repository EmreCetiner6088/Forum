import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    try {
      // SockJS ile WebSocket bağlantısı oluştur
      const socket = new SockJS('http://localhost:8080/ws'); // Backend WebSocket endpoint
      const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        reconnectDelay: 5000, // 5 saniye sonra yeniden bağlanma denemesi
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('Bağlantı kuruldu');
          setConnected(true);
          // Mesajları dinle
          stompClient.subscribe('/topic/messages', (message) => {
            if (message.body) {
              setMessages((prevMessages) => [...prevMessages, message.body]);
            }
          });
        },
        onStompError: (frame) => {
          console.error('STOMP hata:', frame);
        },
        onWebSocketError: (event) => {
          console.error('WebSocket bağlantı hatası:', event);
        },
        onDisconnect: () => {
          console.log('Bağlantı kesildi');
          setConnected(false);
        }
      });

      stompClient.activate();
      setClient(stompClient);

      return () => {
        if (stompClient.active) {
          stompClient.deactivate();
        }
      };
    } catch (error) {
      console.error('WebSocket bağlantısı kurulurken hata oluştu:', error);
    }
  }, []);

  const sendMessage = () => {
    if (input && client && connected) {
      try {
        // Mesajı gönder
        client.publish({
          destination: '/app/chat',  // Mesajı gönderilecek kanal
          body: JSON.stringify({ message: input }),
        });
        setInput('');
      } catch (error) {
        console.error('Mesaj gönderilirken hata oluştu:', error);
      }
    } else {
      console.warn('Mesaj gönderilemedi: ' + 
        (!input ? 'Mesaj boş' : !client ? 'Client yok' : 'Bağlantı yok'));
    }
  };

  return (
    <div>
      <div>
        <h2>Mesajlar</h2>
        <div style={{ color: connected ? 'green' : 'red' }}>
          Durum: {connected ? 'Bağlı' : 'Bağlantı yok'}
        </div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Mesaj yazın"
      />
      <button onClick={sendMessage} disabled={!connected}>Gönder</button>
    </div>
  );
};

export default Chat;
