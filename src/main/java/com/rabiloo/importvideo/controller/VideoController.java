package com.rabiloo.importvideo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VideoController {
    @GetMapping("/")
    public String video(){
        return "video";
    }
}
