package com.EmployeMangement.EmployeeSystem.Repository;

import com.EmployeMangement.EmployeeSystem.DAO.SalaryDetails;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalaryDetailsRepository extends JpaRepository<SalaryDetails,Long> {
    List<SalaryDetails> findByUser(Long user);
}
