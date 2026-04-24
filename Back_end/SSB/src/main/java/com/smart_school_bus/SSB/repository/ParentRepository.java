package com.smart_school_bus.SSB.repository;

import com.smart_school_bus.SSB.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent, String> {
    Optional<Parent> findByUser_UserName(String userName);
}
