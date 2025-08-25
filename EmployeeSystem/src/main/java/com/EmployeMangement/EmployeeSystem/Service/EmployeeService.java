package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.EmployeeEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface EmployeeService {
    String createEmployee(EmployeeEntity employee);
    List<EmployeeEntity> readEmployees();
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id, EmployeeEntity emp);
    EmployeeEntity getEmployeeById(Long id);
}