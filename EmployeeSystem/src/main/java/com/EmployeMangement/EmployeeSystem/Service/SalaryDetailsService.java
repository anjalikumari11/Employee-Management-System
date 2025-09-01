package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.SalaryDetails;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.Repository.SalaryDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryDetailsService {

    @Autowired
    private SalaryDetailsRepository salaryDetailsRepository;

    public SalaryDetails saveSalary(SalaryDetails salaryDetails){
        return salaryDetailsRepository.save(salaryDetails);
    }

    public SalaryDetails getSalaryById(Long id){
        return salaryDetailsRepository.findById(id).orElse(null);
    }

    public List<SalaryDetails> getSalaryByUser(Long id){
        return salaryDetailsRepository.findByUser(id);
    }

    public List<SalaryDetails> getSalaryList(){
        return salaryDetailsRepository.findAll();
    }

}
