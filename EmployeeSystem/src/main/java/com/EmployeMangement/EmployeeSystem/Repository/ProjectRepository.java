package com.EmployeMangement.EmployeeSystem.Repository;

import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import com.EmployeMangement.EmployeeSystem.DAO.ProjectEntity;
import com.EmployeMangement.EmployeeSystem.dto.ProjectDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<ProjectEntity,Long> {
    List<ProjectEntity> findByStatus(String status);
    List<ProjectEntity> findByEmployees_id(Long employeeId);
    Optional<ProjectEntity> findByEmployees_idAndId(Long employeeId, Long projectId);

}
