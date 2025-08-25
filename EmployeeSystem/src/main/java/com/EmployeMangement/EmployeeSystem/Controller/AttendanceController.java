package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.Attendance;
import com.EmployeMangement.EmployeeSystem.Repository.AttendanceRepository;
import com.EmployeMangement.EmployeeSystem.Service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository repo;

    public AttendanceController(AttendanceRepository repo) {
        this.repo = repo;
    }
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping
    public List<Attendance> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance att) {
        Long empId = att.getEmployee().getId();
        LocalDate date = att.getDate();
        boolean present = att.isPresent();

        return attendanceService.markAttendance(empId, date, present);
    }

    @GetMapping("/{date}")
        public List<Attendance> getByDate(@PathVariable String date) {
            LocalDate localDate = LocalDate.parse(date);  // yyyy-MM-dd format
            return repo.findByDate(localDate);
    }
}
