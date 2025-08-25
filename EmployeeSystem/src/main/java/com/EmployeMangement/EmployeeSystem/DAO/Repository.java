package com.EmployeMangement.EmployeeSystem.DAO;

import com.EmployeMangement.EmployeeSystem.Service.EmployeeService;
import org.springframework.data.jpa.repository.JpaRepository;

//@org.springframework.stereotype.Repository
public interface Repository extends JpaRepository<EmployeeEntity,Long> {

}
