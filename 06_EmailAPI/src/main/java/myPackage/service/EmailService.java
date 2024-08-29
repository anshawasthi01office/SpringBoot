package myPackage.service;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public boolean sendEmail(String subject, String message, String to) {
        boolean isSent = false;
        
        // Sender's email ID
        String from = "anshawasthi.office@gmail.com";
        
        // Gmail's SMTP server
        String host = "smtp.gmail.com";
        
        // Get system properties and set up mail server properties
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        
        // Creating a session object
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                // Your actual credentials
                return new PasswordAuthentication("ansh.2024it1215@kiet.edu", "Enter your password");
            }
        });
        
        // Enable debug mode
        session.setDebug(true);
        
        try {
            // Create a default MimeMessage object
            MimeMessage mimeMessage = new MimeMessage(session);
            
            // Set sender's email
            mimeMessage.setFrom(new InternetAddress(from));
            
            // Add recipient
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            
            // Set subject of the email
            mimeMessage.setSubject(subject);
            
            // Set the email message text
            mimeMessage.setText(message);
            
            // Send the message
            Transport.send(mimeMessage);
            System.out.println("Email sent successfully.");
            isSent = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return isSent;
    }
}
