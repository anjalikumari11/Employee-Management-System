package com.EmployeMangement.EmployeeSystem.Repository;

import com.EmployeMangement.EmployeeSystem.DAO.SalarySlipLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalarySlipRepository extends JpaRepository<SalarySlipLog,Long> {

}
