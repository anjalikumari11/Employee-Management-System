package com.EmployeMangement.EmployeeSystem.DAO;

import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import com.EmployeMangement.EmployeeSystem.Service.EmployeeService;
import com.EmployeMangement.EmployeeSystem.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//@org.springframework.stereotype.Repository
public interface Repository extends JpaRepository<User,Long> {
    List<User> findByUserRole(UserRole userRole);
}
