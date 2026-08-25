package com.manu.hr_management_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String firstName;

    @Column(nullable = false)
    @NotBlank
    private String lastName;

    @Column(nullable = false, unique = true)
    @NotBlank
    private String email;


    private String phone;

    @Column(nullable = false)
    @NotNull
    private LocalDate hireDate;

    @Column(nullable = false)
    @NotNull
    private BigDecimal salary;

    private Boolean active = true;



}
