package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.Service.AuthService;
import com.EmployeMangement.EmployeeSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService  authService;

    @GetMapping
    public List<User> getAllUser(){
        return authService.getUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody UserDTO user){
        UserDTO dbUser = authService.login(user);
        if(dbUser == null){
            return new ResponseEntity<>("Wrong Crediential", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(dbUser,HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user){
           authService.createUserorAdmin(user);
           return new ResponseEntity<>(user,HttpStatus.OK);
    }


}
