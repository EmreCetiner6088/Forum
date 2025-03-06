package com.app.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.forum.entity.Student;
import com.app.forum.repository.StudentRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private StudentRepository studentRepository;

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Student student = studentRepository.findByUsername(username);
    if(student == null) {
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
    return User.withUsername(student.getUsername())
               .password(student.getPassword())
               .roles("USER")
               .build();
}
    
}
