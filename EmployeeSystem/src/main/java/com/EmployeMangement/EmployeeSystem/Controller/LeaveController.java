package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.Attendance;
import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import com.EmployeMangement.EmployeeSystem.Service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("leave")
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

    @PostMapping("/sendRequest")
    public EmployeeLeave sendRequest(@RequestBody EmployeeLeave employeeLeave){
        return leaveService.RequestLeave(employeeLeave);
    }

    @GetMapping
    public List<EmployeeLeave> getRequest(){
        return leaveService.getAllRequest();
    }
}
