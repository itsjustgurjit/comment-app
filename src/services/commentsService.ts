import type { Comment } from '../types';

const STORAGE_KEY = 'community_comments';

class CommentsService {
  private subscribers: ((comments: Comment[]) => void)[] = [];

  getComments(): Comment[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const comments = JSON.parse(stored);
      // Convert stored ISO strings back to Date objects
      return this.convertDates(comments);
    } catch (e) {
      console.error('Failed to parse stored comments:', e);
      return [];
    }
  }

  private convertDates(comments: Comment[]): Comment[] {
    return comments.map(comment => ({
      ...comment,
      timestamp: new Date(comment.timestamp),
      replies: this.convertDates(comment.replies)
    }));
  }

  saveComments(comments: Comment[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    this.notifySubscribers(comments);
  }

  subscribe(callback: (comments: Comment[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(comments: Comment[]) {
    this.subscribers.forEach(callback => callback(comments));
  }
}

// Singleton instance
export const commentsService = new CommentsService();