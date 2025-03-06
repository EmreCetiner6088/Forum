package com.app.forum.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.app.forum.entity.Student;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {
    
    public static final String SECRET_KEY = "blablalblasdlasdakawodkowdaopsd_323232323232323232";

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Student student) {
        return Jwts.builder()
                .claim("sub", student.getUsername())
                .claim("email", student.getEmail())
                .claim("iat", new Date())
                .claim("exp", new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 saat geçerli
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }
    
}
