package myPackage.controller;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import myPackage.entities.LoginData;

@RestController
public class MyController {
    
    @GetMapping("/form")
    public String openForm(Model model) {
        System.out.println("Opening Form");
        model.addAttribute("loginData", new LoginData());
        return "Building Form";
    }
    
    @PostMapping("/process")
    public String processForm(@Valid @ModelAttribute("loginData") LoginData loginData, BindingResult result) {
        if(result.hasErrors()) {
            System.out.println(result);
            return "form";
        }
        
        System.out.println(loginData);
        return "success";
    }
}
