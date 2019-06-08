package pl.workout.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuth2Controller {

    @GetMapping("/redirect")
    public String test() {
        return "redirect";
    }
}
