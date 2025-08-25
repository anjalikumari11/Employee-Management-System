package com.EmployeMangement.EmployeeSystem.Repository;

import com.EmployeMangement.EmployeeSystem.DAO.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
    List<Attendance> findByDate(LocalDate date);
}
