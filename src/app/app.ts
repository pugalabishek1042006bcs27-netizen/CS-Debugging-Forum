import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question, Solution, Notification } from './question.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  questions: Question[] = [
    { id: 1, title: 'Pointer Initialization Error', codeSnippet: 'int *ptr; *ptr = 10;', tag: 'CS101', author: 'Senior_Dev', authorId: 'user123', userRole: 'Senior', solutions: [], votes: 0, status: 'Open' }
  ];

  newTitle = '';
  newCode = '';
  newTag = 'CS101';
  newSolution = '';
  solvingQuestionId: number | null = null;
  searchTerm = '';
  currentUserRole: 'Senior' | 'Peer' = 'Peer';
  currentUserId = 'currentUser'; // Mock current user
  notifications: Notification[] = [];
  showNotifications = false;

  courseOptions = [
    'CS101', 'CS201', 'Data Structures', 'Algorithms', 'Web Development',
    'Database Systems', 'Operating Systems', 'Computer Networks'
  ];

  addQuestion() {
    if (!this.newTitle.trim()) return;
    this.questions.push({
      id: Date.now(),
      title: this.newTitle,
      codeSnippet: this.newCode,
      tag: this.newTag,
      author: 'Student_User',
      authorId: this.currentUserId,
      userRole: this.currentUserRole,
      solutions: [],
      votes: 0,
      status: 'Open'
    });
    this.newTitle = ''; this.newCode = ''; this.newTag = 'CS101';
  }

  writeSolution(questionId: number) {
    this.solvingQuestionId = questionId;
  }

  submitSolution() {
    if (this.newSolution.trim() && this.solvingQuestionId !== null) {
      const question = this.questions.find(q => q.id === this.solvingQuestionId);
      if (question) {
        if (!question.solutions) question.solutions = [];
        question.solutions.push({
          id: Date.now(),
          text: this.newSolution,
          author: 'Student_User',
          timestamp: new Date(),
          votes: 0,
          isAccepted: false
        });

        // Create notification for question author (if not the current user)
        if (question.authorId !== this.currentUserId) {
          this.notifications.unshift({
            id: Date.now(),
            type: 'solution',
            message: `New solution posted to your question: "${question.title}"`,
            questionId: question.id,
            questionTitle: question.title,
            timestamp: new Date(),
            isRead: false
          });
        }

        alert('Solution submitted successfully!');
        this.newSolution = '';
        this.solvingQuestionId = null;
      }
    }
  }

  cancelSolution() {
    this.newSolution = '';
    this.solvingQuestionId = null;
  }

  get filteredQuestions() {
    if (!this.searchTerm.trim()) return this.questions;
    const term = this.searchTerm.toLowerCase();
    return this.questions.filter(q =>
      q.title.toLowerCase().includes(term) ||
      q.tag.toLowerCase().includes(term) ||
      q.codeSnippet.toLowerCase().includes(term) ||
      q.author.toLowerCase().includes(term)
    );
  }

  upvoteQuestion(questionId: number) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) question.votes++;
  }

  upvoteSolution(questionId: number, solutionId: number) {
    const question = this.questions.find(q => q.id === questionId);
    if (question && question.solutions) {
      const solution = question.solutions.find(s => s.id === solutionId);
      if (solution) solution.votes++;
    }
  }

  acceptSolution(questionId: number, solutionId: number) {
    const question = this.questions.find(q => q.id === questionId);
    if (question && question.solutions) {
      // Unaccept all solutions first
      question.solutions.forEach(s => s.isAccepted = false);
      // Accept the selected one
      const solution = question.solutions.find(s => s.id === solutionId);
      if (solution) solution.isAccepted = true;
    }
  }

  get unreadNotificationsCount() {
    return this.notifications.filter(n => !n.isRead).length;
  }

  markNotificationAsRead(notificationId: number) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) notification.isRead = true;
  }

  markAllNotificationsAsRead() {
    this.notifications.forEach(n => n.isRead = true);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  clearAllNotifications() {
    this.notifications = [];
  }
}
