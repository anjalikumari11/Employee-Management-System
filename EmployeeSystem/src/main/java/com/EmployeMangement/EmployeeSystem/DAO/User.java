package com.EmployeMangement.EmployeeSystem.DAO;

import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import com.EmployeMangement.EmployeeSystem.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phone;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private String department;

    // Convert to DTO
    public UserDTO getDto() {
        UserDTO dto = new UserDTO();
        dto.setUserId(id);
        dto.setName(name);
        dto.setEmail(email);
        dto.setUserRole(userRole);
        dto.setDepartment(department);
        return dto;
    }

}
