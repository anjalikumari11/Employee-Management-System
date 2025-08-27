package com.EmployeMangement.EmployeeSystem.Repository;


import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveAttendanceRepository extends JpaRepository<EmployeeLeave,Long> {

}
