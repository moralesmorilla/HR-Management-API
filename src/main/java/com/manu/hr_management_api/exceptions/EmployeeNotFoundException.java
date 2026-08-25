package com.manu.hr_management_api.exceptions;

import jakarta.validation.constraints.NotBlank;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException( Long id) {
        super("El id "+id+" no existe");
    }
}
