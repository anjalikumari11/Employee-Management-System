package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.SalaryDetails;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.Service.SalaryDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/salary")
public class SalaryDetailsController {
    @Autowired
    private SalaryDetailsService salaryDetailsService;

    @PostMapping("/add")
    public SalaryDetails addSalary(@RequestBody SalaryDetails salaryDetails){
        return salaryDetailsService.saveSalary(salaryDetails);
    }

    @GetMapping("employee/{id}")
    public  SalaryDetails getSalaryDetail(@PathVariable Long id){
        return salaryDetailsService.getSalaryById(id);
    }

    @GetMapping("{employeeId}")
    public List<SalaryDetails> getDetailByuser(@PathVariable Long employeeId){
        return salaryDetailsService.getSalaryByUser(employeeId);
    }

    @GetMapping
    public List<SalaryDetails> getAllList(){
        return salaryDetailsService.getSalaryList();
    }

}
