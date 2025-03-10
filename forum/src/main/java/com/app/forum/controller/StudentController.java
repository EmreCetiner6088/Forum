package com.app.forum.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.forum.entity.Student;
import com.app.forum.service.StudentService;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/students/{id}")
    public void getStudentById(@PathVariable int id) {
        studentService.getStudentById(id);
    }

    @PostMapping("/students")
    public void addStudent(@RequestBody Student student) {
        studentService.addStudent(student);
    }

    @PutMapping("/students")
    public void updateStudent(@RequestBody Student student) {
        studentService.updateStudent(student);
    }

    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
    }

    @PostMapping("/students/login")
    public Map<String, Object> loginStudent(@RequestBody Student student) {
        Boolean isAuth = studentService.loginStudent(student);
        Map<String, Object> response = new HashMap<>();
        response.put("isAuth", isAuth);
        return response;
    }
    
    @GetMapping("/profile/{username}")
    public Student getProfileStudent(@PathVariable String username) {
        return studentService.getProfileStudent(username);
    }
}
    