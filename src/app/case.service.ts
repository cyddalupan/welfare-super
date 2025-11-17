import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { AiService } from './ai.service';
import {
  SELECT_OPEN_CASE_BY_APPLICANT_ID,
  INSERT_CASE,
  UPDATE_CASE_REPORT
} from './queries';
import { SYSTEM_PROMPT_REPORT_GENERATOR } from './prompts';
import { ChatMessage } from './schemas'; // Correct import path
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

interface CaseReport {
  id?: number; // Optional for new cases
  employee_id: number;
  category: string;
  report: string;
  report_status: string;
}

interface AiReportResponse {
  category: string;
  report: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService
  ) { }

  /**
   * Handles the creation or update of a case report based on chat history.
   * Emits status messages for UI updates.
   * @param employeeId The ID of the employee.
   * @param agencyId The ID of the agency.
   * @param chatHistory The relevant chat messages for generating the report.
   * @param onStatusUpdate Callback function to emit status messages to the UI.
   * @returns Observable<number> The ID of the created or updated case.
   */
  handleReportCreation(
    employeeId: number,
    agencyId: number,
    chatHistory: ChatMessage[],
    onStatusUpdate: (message: string) => void
  ): Observable<number> {
    onStatusUpdate("I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you.");
    onStatusUpdate("Checking for any existing reports...");

    return this.databaseService.query(SELECT_OPEN_CASE_BY_APPLICANT_ID, [employeeId]).pipe(
      switchMap((result: any) => {
        const existingCase = result && result.length > 0 ? result[0] : null;

        if (existingCase) {
          onStatusUpdate("An existing report was found. I will now update it with the new information.");
          return this.updateExistingCase(employeeId, existingCase, chatHistory, onStatusUpdate);
        } else {
          onStatusUpdate("No existing report found. I will create a new one for you.");
          return this.createNewCase(employeeId, agencyId, chatHistory, onStatusUpdate);
        }
      }),
      catchError(error => {
        console.error('Error handling report creation:', error);
        onStatusUpdate("An error occurred while processing the report. Please try again.");
        return throwError(() => new Error('Failed to handle report creation.'));
      })
    );
  }

  private createNewCase(
    employeeId: number,
    agencyId: number,
    chatHistory: ChatMessage[],
    onStatusUpdate: (message: string) => void
  ): Observable<number> {
    onStatusUpdate("Generating a summary of your complaint...");
    const prompt = this.buildReportGenerationPrompt(chatHistory);

    return this.aiService.callAi([{ role: 'system', content: prompt }]).pipe(
      switchMap((aiResponseString: string) => {
        const aiResponse: AiReportResponse = JSON.parse(aiResponseString);
        onStatusUpdate("Saving the report to your file...");
        return this.databaseService.query(INSERT_CASE, [
          employeeId,
          agencyId,
          aiResponse.category,
          aiResponse.report,
        ]).pipe(
          switchMap((insertResult: any) => {
            const caseId = insertResult.insertId; // Assuming insertId is returned
            onStatusUpdate(`Your report has been successfully filed. Your case ID is ${caseId}.`);
            return of(caseId);
          })
        );
      }),
      catchError(error => {
        console.error('Error creating new case:', error);
        onStatusUpdate("An error occurred while creating the report. Please try again.");
        return throwError(() => new Error('Failed to create new case.'));
      })
    );
  }

  private updateExistingCase(
    employeeId: number,
    existingCase: CaseReport,
    chatHistory: ChatMessage[],
    onStatusUpdate: (message: string) => void
  ): Observable<number> {
    onStatusUpdate("Updating the summary of your complaint...");
    const prompt = this.buildReportGenerationPrompt(chatHistory, existingCase.report);

    return this.aiService.callAi([{ role: 'system', content: prompt }]).pipe(
      switchMap((aiResponseString: string) => {
        const aiResponse: AiReportResponse = JSON.parse(aiResponseString); // AI will return updated report
        onStatusUpdate("Saving the updated report to your file...");
        return this.databaseService.query(UPDATE_CASE_REPORT, [
          aiResponse.report,
          existingCase.id // Assuming existingCase.id is available
        ]).pipe(
          switchMap(() => {
            onStatusUpdate(`Your report (Case ID: ${existingCase.id}) has been successfully updated.`);
            return of(existingCase.id!);
          })
        );
      }),
      catchError(error => {
        console.error('Error updating existing case:', error);
        onStatusUpdate("An error occurred while updating the report. Please try again.");
        return throwError(() => new Error('Failed to update existing case.'));
      })
    );
  }

  private buildReportGenerationPrompt(chatHistory: ChatMessage[], existingReport?: string): string {
    let prompt = SYSTEM_PROMPT_REPORT_GENERATOR;
    const chatHistoryString = chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    prompt = prompt.replace('{{CHAT_HISTORY}}', chatHistoryString);

    if (existingReport) {
      prompt = prompt.replace('{{EXISTING_REPORT_PLACEHOLDER}}', `Existing Report:\n${existingReport}`);
    } else {
      prompt = prompt.replace('{{EXISTING_REPORT_PLACEHOLDER}}', '');
    }
    return prompt;
  }
}