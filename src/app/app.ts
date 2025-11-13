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

  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    // Dummy code removed
  }
}
 