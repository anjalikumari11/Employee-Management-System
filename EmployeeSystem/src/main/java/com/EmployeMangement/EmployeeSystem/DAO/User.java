package com.EmployeMangement.EmployeeSystem.DAO;

import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import com.EmployeMangement.EmployeeSystem.dto.UserDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phone;
    private UserRole userRole;
    private String department;

    public UserDTO getDto(){
        UserDTO dto = new UserDTO();
        dto.setUserId(id);
        dto.setName(name);
        dto.setEmail(email);
        dto.setUserRole(userRole);
        dto.setDepartment(department);
        return dto;
    }

}
