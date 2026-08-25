package com.manu.hr_management_api.service;

import com.manu.hr_management_api.entity.Employee;
import java.util.List;
import java.util.Optional;


public interface EmployeeService {
    Employee create(Employee employee);
    Employee findById(Long id);
    List<Employee> findAll();
    Employee update(Long id,Employee employee);
    void delete(Long id);

}
