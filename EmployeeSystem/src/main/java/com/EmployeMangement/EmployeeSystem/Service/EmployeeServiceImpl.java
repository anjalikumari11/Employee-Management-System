package com.EmployeMangement.EmployeeSystem.Service;

//import com.EmployeMangement.EmployeeSystem.DAO.EmployeeEntity;
import com.EmployeMangement.EmployeeSystem.DAO.Repository;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    List<User> employees = new ArrayList<>();

    @Autowired
    public Repository repo;

    @Override
    public String createEmployee(User employee) {
        repo.save(employee);
        return "Saved Succefully";
    }

    @Override
    public List<User> readEmployees() {
        return repo.findAll();
    }

    @Override
    public User getEmployeeById(Long id){
        User emp = (User) repo.findById(id).get();
        return emp;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        repo.deleteById(id);
        return true;
    }

    @Override
    public String updateEmployee(Long id, User emp) {
//        Optional<EmployeeEntity> optionalEmployee = repo.findById(id);
//        EmployeeEntity employee = optionalEmployee.orElseThrow();
      try{
          User existingEmp = repo.findById(id).get();
          existingEmp.setName(emp.getName());
          existingEmp.setEmail(emp.getEmail());
          existingEmp.setPhone(emp.getPhone());
          existingEmp.setDepartment(emp.getDepartment());

          repo.save(existingEmp);
          return "update successfully";
      }catch (Exception e){
          return e.getMessage();
      }
    }

}
