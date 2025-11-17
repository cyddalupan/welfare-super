import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../../schemas';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css'],
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  employee: Partial<Employee> = {};
  isEditMode = false;
  employeeId: number | null = null;
  isLoading = false; // Add loading state

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployeeData(this.employeeId);
    }
  }

  async loadEmployeeData(id: number): Promise<void> {
    this.isLoading = true; // Set loading to true
    this.cdr.detectChanges(); // Force change detection to show loading indicator immediately
    try {
      const data = await this.employeeService.getEmployeeById(id);
      if (data) {
        this.employee = data;
        this.cdr.detectChanges(); // Manually trigger change detection
      } else {
        // Handle case where employee is not found
        this.router.navigate(['/admin/employees']);
      }
    } catch (error) {
      console.error('Error loading employee data:', error);
    } finally {
      this.isLoading = false; // Set loading to false
      this.cdr.detectChanges(); // Force change detection to hide loading indicator immediately
    }
  }

  async saveEmployee(): Promise<void> {
    try {
      if (this.isEditMode && this.employeeId) {
        await this.employeeService.updateEmployee({ ...this.employee, id: this.employeeId } as Employee);
      } else {
        await this.employeeService.createEmployee(this.employee as Omit<Employee, 'id'>);
      }
      this.router.navigate(['/admin/employees']);
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Failed to save employee.');
    }
  }
}
