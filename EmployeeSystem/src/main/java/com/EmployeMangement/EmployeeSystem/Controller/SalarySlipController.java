package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.Service.SalarySlipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

@CrossOrigin("*")
@RestController
@RequestMapping("/salary-slip")
public class SalarySlipController {

    @Autowired
    private SalarySlipService salarySlipService;

    @GetMapping("/{salaryId}/download")
    public ResponseEntity<byte[]> downloadSlip(@PathVariable Long salaryId){
        ByteArrayInputStream bis = salarySlipService.generateSlip(salaryId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition","inline; filename=salary-slip-"+salaryId+".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(bis.readAllBytes());
    }
}
