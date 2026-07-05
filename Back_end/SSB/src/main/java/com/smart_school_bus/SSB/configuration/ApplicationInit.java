package com.smart_school_bus.SSB.configuration;

import com.smart_school_bus.SSB.constant.PredefinedRoles;
import com.smart_school_bus.SSB.entity.Permission;
import com.smart_school_bus.SSB.entity.Role;
import com.smart_school_bus.SSB.entity.User;
import com.smart_school_bus.SSB.repository.PermissionRepository;
import com.smart_school_bus.SSB.repository.RoleRepository;
import com.smart_school_bus.SSB.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Profile("!test")
public class ApplicationInit {
    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin123";


    @Bean
    @ConditionalOnProperty(
            prefix = "spring.datasource",
            value = "driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver"
    )
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository, PermissionRepository permissionRepository) {
        log.info("Initializing application.....");
        return args -> {
            if (!userRepository.existsByUserName(ADMIN_USER_NAME)) {
//                PERMISSION
                Permission createUser = Permission.builder()
                        .name("CREATE_USER")
                        .description("Create user")
                        .build();
                Permission readUser = Permission.builder()
                        .name("READ_USER")
                        .description("Delete user")
                        .build();
                Permission updateUser = Permission.builder()
                        .name("UPDATE_USER")
                        .description("Update user")
                        .build();
                Permission deleteUser = Permission.builder()
                        .name("DELETE_USER")
                        .description("Delete user")
                        .build();

                List<Permission> permissionList = new ArrayList<>();
                permissionList.add(createUser);
                permissionList.add(readUser);
                permissionList.add(updateUser);
                permissionList.add(deleteUser);

//                ROLE
                Set<Permission> adminRolePermissions = new HashSet<Permission>();
                Set<Permission> userRolePermissions = new HashSet<Permission>();
                Set<Permission> driverRolePermissions = new HashSet<Permission>();
                Set<Permission> parentRolePermissions = new HashSet<Permission>();

                permissionList.forEach(adminRolePermissions::add);

                Role userRole = Role.builder()
                        .name(PredefinedRoles.USER_ROLE)
                        .description("User role")
                        .permissions(userRolePermissions)
                        .build();

                Role adminRole = Role.builder()
                        .name(PredefinedRoles.ADMIN_ROLE)
                        .description("Admin role")
                        .permissions(adminRolePermissions)
                        .build();

                Role driverRole = Role.builder()
                        .name(PredefinedRoles.DRIVER_ROLE)
                        .description("Driver role")
                        .permissions(driverRolePermissions)
                        .build();

                Role parentRole = Role.builder()
                        .name(PredefinedRoles.PARENT_ROLE)
                        .description("Parent role")
                        .permissions(driverRolePermissions)
                        .build();

                roleRepository.save(userRole);
                roleRepository.save(driverRole);
                roleRepository.save(parentRole);

//                USER_ADMIN
                Set<Role> roles = new HashSet<Role>();
                roles.add(adminRole);

                User admin = User.builder()
                        .userName(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .createdAt(LocalDateTime.now())
                        .build();

                userRepository.save(admin);
                log.info("admin user has been created with default password: admin123, please change it");
            }
            log.info("Application initialization completed .....");
            log.info("swagger: localhost:8080/smart-school-bus/swagger-ui/index.html");
        };
    }
}
