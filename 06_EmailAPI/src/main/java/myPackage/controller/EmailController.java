package myPackage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import myPackage.model.EmailRequest;
import myPackage.service.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;
    
    @RequestMapping("/welcome")
    public String welcome() {
        return "Welcome";
    }
    
    @PostMapping("/sendmail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest request) {
        System.out.println(request);
        boolean result = emailService.sendEmail(request.getSubject(), request.getMessage(), request.getTo());
        if (result) { 
            return ResponseEntity.ok("Email is sent successfully...");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email is not sent");
        }
    }
}
