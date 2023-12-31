package com.example.jpaProject.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@Slf4j
public class HomeController {

    @GetMapping("/api/hello")
    public List<String> test() {
        return Arrays.asList("hello","test022");
    }
}
