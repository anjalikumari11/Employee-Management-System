package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.Attendance;
import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import com.EmployeMangement.EmployeeSystem.Service.LeaveService;
import com.EmployeMangement.EmployeeSystem.dto.StatusRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

    @GetMapping("/employee/{empId}")
    public List<EmployeeLeave> getRequestByEmployeeId(@PathVariable Long empId) {
        return leaveService.getAllRequestById(empId);
    }

   //admin access
    @GetMapping("/status/{status}")
    public List<EmployeeLeave> getLeaveByStatus(@PathVariable String status){
        return leaveService.getByStatus(status);
    }

    //approved
    @PutMapping("/approve")
    public String approveLeave(@RequestBody StatusRequestDTO request) {
        return leaveService.approveLeave(request.getStatus(), request.getEmpId(), request.getDate());
    }


}
