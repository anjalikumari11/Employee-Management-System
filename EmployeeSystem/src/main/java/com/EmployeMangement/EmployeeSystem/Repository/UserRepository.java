package com.EmployeMangement.EmployeeSystem.Repository;

import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.EnumConstant.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserRole(UserRole role);
    Optional<User> findByEmail(String email);
}
