import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './database.service';
import { AiService } from './ai.service';
import { ChatMessage } from './schemas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'welfare-super';
  public databaseResult: any;
  public aiResult: any;

  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    this.databaseService.query('SELECT * FROM user').subscribe({
      next: (response) => {
        this.databaseResult = response;
        console.log('Database query successful:', response);
      },
      error: (error) => {
        this.databaseResult = error;
        console.error('Database query failed:', error);
      }
    });

    const aiQuery: ChatMessage[] = [{
      role: 'user',
      content: 'what state is new york belong and what is the NBA team they have.'
    }];
    this.aiService.callAi(aiQuery).subscribe({
      next: (response) => {
        this.aiResult = response;
        console.log('AI query successful:', response);
      },
      error: (error) => {
        this.aiResult = error;
        console.error('AI query failed:', error);
      }
    });
  }
}
 