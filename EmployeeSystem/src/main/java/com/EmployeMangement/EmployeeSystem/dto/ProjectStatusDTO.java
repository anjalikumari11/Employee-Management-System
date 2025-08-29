package com.EmployeMangement.EmployeeSystem.dto;

import lombok.Data;

@Data
public class ProjectStatusDTO {
    private Long empId;
    private String status;
    private Long projectId;
}
