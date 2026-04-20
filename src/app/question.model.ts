export interface Solution {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  votes: number;
  isAccepted: boolean;
}

export interface Notification {
  id: number;
  type: 'solution' | 'comment';
  message: string;
  questionId: number;
  questionTitle: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Question {
  id: number;
  title: string;
  codeSnippet: string;
  tag: string;
  author: string;
  authorId: string;
  userRole: 'Senior' | 'Peer';
  solutions?: Solution[];
  votes: number;
  status: 'Open' | 'In Progress' | 'Resolved';
}
