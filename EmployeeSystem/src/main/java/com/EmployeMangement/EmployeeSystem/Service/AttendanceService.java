package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.Attendance;
import com.EmployeMangement.EmployeeSystem.DAO.EmployeeEntity;
import com.EmployeMangement.EmployeeSystem.DAO.Repository;
import com.EmployeMangement.EmployeeSystem.Repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private Repository employeeRepository;

//    public List<Attendance> getAllAttendance() {
//        return attendanceRepository.findAll();
//    }

    public Attendance markAttendance(Long empId, LocalDate date, boolean present) {
        Optional<Attendance> existing = attendanceRepository.findByEmployeeIdAndDate(empId, date);
        if (existing.isPresent()) {
            throw new RuntimeException("Attendance already marked for employee on this date.");
        }

        Attendance attendance = new Attendance();
        attendance.setDate(date);
        attendance.setPresent(present);

        // Employee ko attach karna hoga (EntityManager track kare)
        EmployeeEntity emp = new EmployeeEntity();
        emp.setId(empId);
        attendance.setEmployee(emp);

        return attendanceRepository.save(attendance);
    }

}
