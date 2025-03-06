package com.app.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.app.forum.entity.Student;
import com.app.forum.repository.StudentRepository;
import com.app.forum.service.JwtUtil;
import com.app.forum.service.UserDetailsServiceImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;
import java.security.Key;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, StudentRepository userRepository,
                          PasswordEncoder passwordEncoder, JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.studentRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public String register(@RequestBody Student user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        studentRepository.save(user);
        return "Kullanıcı başarıyla kaydedildi!";
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Student user, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Yanlış şifre");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Kimlik doğrulama sırasında hata oluştu: " + e.getMessage());
        }

        // Kullanıcı bilgilerini veritabanından al
        Student student = studentRepository.findByUsername(user.getUsername());
        
        String jwt = jwtUtil.generateToken(student);
        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", jwt);
        responseBody.put("username", student.getUsername());
        responseBody.put("email", student.getEmail());

        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // Mevcut cookie'leri al
        Cookie[] cookies = request.getCookies();
        
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    // JWT cookie'sini geçersiz kıl
                    Cookie newCookie = new Cookie("jwt", null);
                    newCookie.setMaxAge(0); // Cookie'yi hemen sil
                    newCookie.setHttpOnly(true);
                    newCookie.setPath("/");
                    newCookie.setSecure(true);
                    response.addCookie(newCookie);
                    break;
                }
            }
        }

        return ResponseEntity.ok()
            .body("Başarıyla çıkış yapıldı");
    }

    @GetMapping("/request")
    public Cookie[] req(HttpServletRequest request) {
        Cookie[] cookie = request.getCookies();
        return cookie;
    }

    @GetMapping("/userinfo")
    public ResponseEntity<Object> decode(@CookieValue("jwt") String token) {
        Claims claims;
        
            Key key = Keys.hmacShaKeyFor(JwtUtil.SECRET_KEY.getBytes());
            JwtParserBuilder parserBuilder = Jwts.parser().setSigningKey(key);
            claims = parserBuilder
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        

        return ResponseEntity.ok().body((String) claims.get("sub") +" "+ (String) claims.get("email"));
    }
}
