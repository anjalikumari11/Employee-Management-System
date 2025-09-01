package com.EmployeMangement.EmployeeSystem.Service;

//import com.EmployeMangement.EmployeeSystem.DAO.EmployeeEntity;
import com.EmployeMangement.EmployeeSystem.DAO.Repository;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import com.EmployeMangement.EmployeeSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<UserDTO> findByuserRole(UserRole userRole) {
        List<User> users = repo.findByUserRole(userRole);
        return users.stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setUserId(user.getId());
            dto.setEmail(user.getEmail());
            dto.setPassword("");
            dto.setName(user.getName());
            dto.setUserRole(user.getUserRole());
            dto.setDepartment(user.getDepartment());
            return dto;
        }).collect(Collectors.toList());
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
