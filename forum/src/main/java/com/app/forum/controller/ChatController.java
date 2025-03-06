package com.app.forum.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public String processMessage(@Payload Map<String, String> payload) {
        // Gelen mesajı işle ve tüm bağlı istemcilere gönder
        String message = payload.get("message");
        System.out.println("Alınan mesaj: " + message);
        return message;
    }
} 