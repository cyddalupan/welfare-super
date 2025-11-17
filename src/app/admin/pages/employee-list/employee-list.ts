import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Employee } from '../../../schemas';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.loadEmployees();
  }

  async loadEmployees(): Promise<void> {
    try {
      this.allEmployees = await this.employeeService.getEmployees();
      this.filteredEmployees = [...this.allEmployees];
      console.log('All Employees:', this.allEmployees);
      console.log('Filtered Employees:', this.filteredEmployees);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }

  filterEmployees(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.allEmployees.filter(emp =>
      (emp.first_name?.toLowerCase() ?? '').includes(term) ||
      (emp.last_name?.toLowerCase() ?? '').includes(term) ||
      (emp.passport_number?.toLowerCase() ?? '').includes(term) ||
      (emp.country?.toLowerCase() ?? '').includes(term)
    );
  }

  sort(field: keyof Employee): void {
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [field]: direction };

    this.filteredEmployees.sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  async deleteEmployee(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await this.employeeService.deleteEmployee(id);
        this.loadEmployees(); // Refresh the list
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee.');
      }
    }
  }
}
