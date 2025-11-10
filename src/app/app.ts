import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'welfare-super';

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.query('SELECT * FROM user').subscribe({
      next: (response) => {
        console.log('Database query successful:', response);
      },
      error: (error) => {
        console.error('Database query failed:', error);
      }
    });
  }
}
 