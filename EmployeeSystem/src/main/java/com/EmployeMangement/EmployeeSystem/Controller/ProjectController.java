package com.EmployeMangement.EmployeeSystem.Controller;

import com.EmployeMangement.EmployeeSystem.DAO.ProjectEntity;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.Repository.UserRepository;
import com.EmployeMangement.EmployeeSystem.Service.ProjectService;
import com.EmployeMangement.EmployeeSystem.dto.ProjectDTO;
import com.EmployeMangement.EmployeeSystem.dto.ProjectStatusDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("Project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    //add project
    @PostMapping
    public ProjectEntity createProject(@RequestBody ProjectDTO request) {
        return projectService.createProject(request);
    }

    @GetMapping
    public List<ProjectDTO> getAllProject(){
        return projectService.getAllProjects();
    }

    @GetMapping("/status/{status}")
    public List<ProjectDTO> getByStatus(@PathVariable String status){
        return projectService.getListByStatus(status);
    }

    @GetMapping("/employee/{empId}")
    public List<ProjectDTO> getByEmployeeId(@PathVariable Long empId){
        return projectService.getListByEmpId(empId);
    }

    @PutMapping("/status")
    public String changeStatus(@RequestBody ProjectStatusDTO project){
        return projectService.changeStatus(project.getEmpId(),project.getProjectId(),project.getStatus());
    }

    @GetMapping("/{projectId}/employees")
    public Set<User> getEmployeesByProject(@PathVariable Long projectId) {
        return projectService.findEmpPerProject(projectId);
    }

}

