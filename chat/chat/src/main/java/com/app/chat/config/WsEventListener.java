package com.app.chat.config;

import com.app.chat.entity.ChatMessage;
import com.app.chat.entity.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class WsEventListener {

    private final SimpMessageSendingOperations messageTemplate;
    public WsEventListener(SimpMessageSendingOperations messageTemplate) {
        this.messageTemplate = messageTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(@Payload SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            System.out.println("disconnected");
            ChatMessage message = new ChatMessage();
            message.setType(MessageType.LEAVE);
            message.setSender(username);
            message.setSender(username);
            var chatMessage = message;
            messageTemplate.convertAndSend("/topic/public", chatMessage);

        }
    }

}
