package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import com.EmployeMangement.EmployeeSystem.Repository.UserRepository;
import com.EmployeMangement.EmployeeSystem.dto.UserDTO;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public String createUserorAdmin(User user){
        userRepository.save(user);
        return "User Inserted Successfully";
    }

//    @PostConstruct
//    private void createAdminUser(){
//        User optionalUser = userRepository.findByUserRole(UserRole.ADMIN);
//        if(optionalUser == null){
//            User user = new User();
//            user.setName("Admin");
//            user.setEmail("admin@gmail.com");
//            user.setUserRole(UserRole.ADMIN);
//            user.setPassword("admin");
//
//            userRepository.save(user);
//            System.out.println("Admin user created.");
//        }else{
//            System.out.println("Admin user Already exists.");
//
//        }
//    }

    public UserDTO login(UserDTO user){
        Optional<User> dbUser = userRepository.findByEmail(user.getEmail());

        if(dbUser.isPresent() && user.getPassword().equals(dbUser.get().getPassword())){
            return dbUser.get().getDto();
        }
        return null;
    }

}
