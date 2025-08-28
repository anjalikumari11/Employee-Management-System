package com.EmployeMangement.EmployeeSystem.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class StatusRequestDTO {
    private Long empId;
    private String status;
    private LocalDate date;
}
