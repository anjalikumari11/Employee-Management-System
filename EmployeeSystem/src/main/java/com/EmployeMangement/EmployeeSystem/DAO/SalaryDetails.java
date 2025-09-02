package com.EmployeMangement.EmployeeSystem.DAO;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "salary_details")
@Data
public class SalaryDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "employee_id", nullable = false)
    private Long user;

    private Float basicSalary;
    private  Float allowances;
    private Float bonus;
    private  Float pfDeduction;
    private Float taxDeduction;
    private LocalDate effectiveDate;
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp created_at;

}
