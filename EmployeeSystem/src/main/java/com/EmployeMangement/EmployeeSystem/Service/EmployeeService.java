package com.EmployeMangement.EmployeeSystem.Service;

//import com.EmployeMangement.EmployeeSystem.DAO.EmployeeEntity;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface EmployeeService {
    String createEmployee(User employee);
    List<User> readEmployees();
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id, User emp);
    User getEmployeeById(Long id);
}