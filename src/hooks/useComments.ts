import { useState, useEffect } from 'react';
import type { Comment } from '../types';
import { commentsService } from '../services/commentsService';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(() => 
    commentsService.getComments()
  );

  useEffect(() => {
    // Subscribe to comments updates
    const unsubscribe = commentsService.subscribe(setComments);
    return unsubscribe;
  }, []);

  const addComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: `user${Math.floor(Math.random() * 1000)}`,
      likes: 0,
      timestamp: new Date(),
      replies: [],
    };
    
    const updatedComments = [newComment, ...comments].sort((a, b) => b.likes - a.likes);
    commentsService.saveComments(updatedComments);
  };

  const likeComment = (id: string) => {
    const updateLikes = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateLikes(comment.replies) };
        }
        return comment;
      });
    };

    const updatedComments = updateLikes(comments).sort((a, b) => b.likes - a.likes);
    commentsService.saveComments(updatedComments);
  };

  const addReply = (parentId: string, replyText: string) => {
    const addReplyToComments = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          const newReply: Comment = {
            id: Date.now().toString(),
            text: replyText,
            author: `user${Math.floor(Math.random() * 1000)}`,
            likes: 0,
            timestamp: new Date(),
            replies: [],
          };
          return {
            ...comment,
            replies: [newReply, ...comment.replies],
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComments(comment.replies),
          };
        }
        return comment;
      });
    };

    const updatedComments = addReplyToComments(comments);
    commentsService.saveComments(updatedComments);
  };

  return {
    comments,
    addComment,
    likeComment,
    addReply,
  };
}