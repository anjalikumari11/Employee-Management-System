package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.EmployeeEntity;
import com.EmployeMangement.EmployeeSystem.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;


    @GetMapping("employees")
    public List<EmployeeEntity> getAllEmployees() {
        return employeeService.readEmployees();
    }

    @GetMapping("employees/{id}")
    public EmployeeEntity getEmployeeById(@PathVariable Long id){
        return employeeService.getEmployeeById(id);
    }

    @PostMapping("employees")
    public String createEmployee(@RequestBody EmployeeEntity employee) {
        // employees.add(employee);
        return employeeService.createEmployee(employee);
    }
    @DeleteMapping("employees/{id}")
    public boolean deleteEmployee(@PathVariable Long id) {
       return employeeService.deleteEmployee(id);
    }
    @PutMapping("employees/{id}")
    public String updateEmp(@PathVariable Long id, @RequestBody EmployeeEntity emp){
        return employeeService.updateEmployee(id,emp);
    }

}
