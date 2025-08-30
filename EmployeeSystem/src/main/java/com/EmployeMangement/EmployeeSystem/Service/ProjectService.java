package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.EmployeeLeave;
import com.EmployeMangement.EmployeeSystem.DAO.ProjectEntity;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.Repository.ProjectRepository;
import com.EmployeMangement.EmployeeSystem.Repository.UserRepository;
import com.EmployeMangement.EmployeeSystem.dto.ProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    // Create project and assign employees
    public ProjectEntity createProject(ProjectDTO request) {
        ProjectEntity project = new ProjectEntity();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setStatus(request.getStatus());
        List<User> employees = userRepository.findAllById(request.getUserIds());
        project.getEmployees().addAll(employees);

        return projectRepository.save(project);
    }

    public List<ProjectDTO> getAllProjects() {
        List<ProjectEntity> projects = projectRepository.findAll();
        return projects.stream().map(project -> {
            ProjectDTO dto = new ProjectDTO();
            dto.setName(project.getName());
            dto.setDescription(project.getDescription());
            dto.setStartDate(project.getStartDate());
            dto.setEndDate(project.getEndDate());
            dto.setStatus(project.getStatus());
            // Get list of employee IDs
            dto.setUserIds(
                    project.getEmployees()
                            .stream()
                            .map(User::getId)
                            .collect(Collectors.toList())
            );
            return dto;
        }).collect(Collectors.toList());
    }

    public List<ProjectDTO> getListByStatus(String status){
        List<ProjectEntity> projects = projectRepository.findByStatus(status);
        return projects.stream().map(project -> {
            ProjectDTO dto = new ProjectDTO();
            dto.setName(project.getName());
            dto.setDescription(project.getDescription());
            dto.setStartDate(project.getStartDate());
            dto.setEndDate(project.getEndDate());
            dto.setStatus(project.getStatus());
            dto.setUserIds(
                    project.getEmployees()
                            .stream()
                            .map(User::getId)
                            .collect(Collectors.toList())
            );
            return dto;
        }).collect(Collectors.toList());
    }

    public List<ProjectDTO> getListByEmpId(Long empId){
      List<ProjectEntity> projects = projectRepository.findByEmployees_id(empId);
        return projects.stream().map(project -> {
            ProjectDTO dto = new ProjectDTO();
            dto.setId(project.getId());
            dto.setName(project.getName());
            dto.setDescription(project.getDescription());
            dto.setStartDate(project.getStartDate());
            dto.setEndDate(project.getEndDate());
            dto.setStatus(project.getStatus());
            dto.setUserIds(
                    project.getEmployees()
                            .stream()
                            .map(User::getId)
                            .collect(Collectors.toList())
            );
            return dto;
        }).collect(Collectors.toList());
    }

    public String changeStatus(Long empId,Long projectID,String status){
        try {
            ProjectEntity project = projectRepository
                    .findByEmployees_idAndId(empId, projectID)
                    .orElseThrow(() -> new RuntimeException(
                            "Project not found with empId: " + empId + " and projectId: " + projectID));

            project.setStatus(status);
            projectRepository.save(project);

            return "Status updated successfully";
        } catch (Exception e) {
            return "Error updating status: " + e.getMessage();
        }
    }

//  emp find by id
   public Set<User> findEmpPerProject(Long projectId) {
    ProjectEntity project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

    return project.getEmployees();
    }

}
