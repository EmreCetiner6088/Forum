package com.app.forum.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.forum.entity.Student;
import com.app.forum.repository.StudentRepository;

@Service
public class StudentService {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    public void addStudent(Student student) {
        student.setPassword(encoder.encode(student.getPassword()));
        studentRepository.save(student);
    }

    public void updateStudent(Student student) {
        studentRepository.save(student);
    }

    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }

    public boolean loginStudent(Student student) {
        Student loginStudent = studentRepository.findByUsername(student.getUsername());
        if(student.equals(loginStudent)) {
            return true;
        }
        return encoder.matches(student.getPassword(), loginStudent.getPassword());
    }

    public Student getProfileStudent(String name) {
        Student student = studentRepository.findByUsername(name);
        return student;
    }
}
