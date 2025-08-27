package com.EmployeMangement.EmployeeSystem.DAO;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private boolean present;
    @ManyToOne
    @JoinColumn(
            name = "employee_id",
            referencedColumnName = "id",
            nullable = false
    )
    private User employee;
}