package com.EmployeMangement.EmployeeSystem.dto;

import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String email;
    private String password;
    private String name;
    private UserRole userRole;
    private String department;
}
