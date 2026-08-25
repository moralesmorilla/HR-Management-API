package com.manu.hr_management_api.exceptions;

import jakarta.validation.constraints.NotBlank;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(@NotBlank String email) {
        super(email);
    }



}
