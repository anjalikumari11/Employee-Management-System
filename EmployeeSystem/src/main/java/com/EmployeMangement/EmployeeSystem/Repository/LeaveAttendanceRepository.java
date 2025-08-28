package com.EmployeMangement.EmployeeSystem.Repository;


import com.EmployeMangement.EmployeeSystem.DAO.Attendance;
import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface LeaveAttendanceRepository extends JpaRepository<EmployeeLeave,Long> {
    List<EmployeeLeave> findByStatus(String status);
    List<EmployeeLeave> findByEmployeeId(Long employeeId);
    Optional<EmployeeLeave> findByEmployeeIdAndDate(Long employeeId, LocalDate date);


}
