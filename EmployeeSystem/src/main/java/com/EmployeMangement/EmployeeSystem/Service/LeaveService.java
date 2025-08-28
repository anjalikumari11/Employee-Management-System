package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import com.EmployeMangement.EmployeeSystem.Repository.LeaveAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveService {
    @Autowired
    private LeaveAttendanceRepository leaveAttendance;

    //send request
    public EmployeeLeave RequestLeave(EmployeeLeave req){
        return leaveAttendance.save(req);
    }

    //Get all Request
    public List<EmployeeLeave> getAllRequest(){
        return leaveAttendance.findAll();
    }

    //get all request by employee id
    public List<EmployeeLeave> getAllRequestById(Long id){
       return leaveAttendance.findByEmployeeId(id);
    }

   //opertions by admin

    //get all pending leaves
    public List<EmployeeLeave> getByStatus(String Status){
        return leaveAttendance.findByStatus(Status);
    }

    //approve leave
    public String approveLeave(String status, Long empId, LocalDate date) {
        try {
            EmployeeLeave existingLeave = leaveAttendance.findByEmployeeIdAndDate(empId,date)
                    .orElseThrow(() -> new RuntimeException("Leave request not found with empId: " + empId));

            existingLeave.setStatus(status);
            leaveAttendance.save(existingLeave);

            return "Status updated successfully";
        } catch (Exception e) {
            return "Error updating leave: " + e.getMessage();
        }
    }

}

