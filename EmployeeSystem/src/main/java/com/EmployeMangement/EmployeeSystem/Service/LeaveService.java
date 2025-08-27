package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import com.EmployeMangement.EmployeeSystem.Repository.LeaveAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {
    @Autowired
    private LeaveAttendanceRepository leaveAttendance;

    //send request
    public EmployeeLeave RequestLeave(EmployeeLeave req){
//        EmployeeLeave request = new EmployeeLeave();
//        request.setEmployeeName(req.getEmployeeName());
//        request.setMessage(req.getMessage());

        return leaveAttendance.save(req);
    }

    //Get all Request
    public List<EmployeeLeave> getAllRequest(){
        return leaveAttendance.findAll();
    }

}

