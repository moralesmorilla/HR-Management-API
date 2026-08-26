package com.manu.hr_management_api.service.impl;

import com.manu.hr_management_api.entity.Employee;
import com.manu.hr_management_api.exceptions.EmailAlreadyExistsException;
import com.manu.hr_management_api.exceptions.EmployeeNotFoundException;
import com.manu.hr_management_api.repository.EmployeeRepository;
import com.manu.hr_management_api.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    @Override
    public Employee create(Employee employee) {
        if(employeeRepository.findByEmail(employee.getEmail()).isPresent()){
          throw new EmailAlreadyExistsException(employee.getEmail());
        }
        employee.setId(null);

        return employeeRepository.save(employee);
    }

    @Override
    public Employee findById(Long id) {
        return employeeRepository
                .findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee update(Long id, Employee newEmployee) {
        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(()-> new EmployeeNotFoundException(id));

        if(employeeRepository.findByEmail(newEmployee.getEmail()).isEmpty()){
            employee.setEmail(newEmployee.getEmail());
        }else{
            if (!newEmployee.getEmail().equals(employee.getEmail())){
                throw new EmailAlreadyExistsException(newEmployee.getEmail());
            }

        }
        employee.setFirstName(newEmployee.getFirstName());
        employee.setLastName(newEmployee.getLastName());
        employee.setPhone(newEmployee.getPhone());
        employee.setHireDate(newEmployee.getHireDate());
        employee.setActive(newEmployee.getActive());
        return employeeRepository.save(employee);
    }

    @Override
    public void delete(Long id) {
        Employee deleteEmployee = employeeRepository
                .findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        employeeRepository.delete(deleteEmployee);
    }
}
