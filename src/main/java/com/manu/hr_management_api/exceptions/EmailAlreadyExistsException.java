package com.manu.hr_management_api.exceptions;

import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {

        super("Ya existe un empleado con el email: "+email);
    }



}
