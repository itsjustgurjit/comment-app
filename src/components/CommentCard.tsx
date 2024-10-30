import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, MoreVertical } from 'lucide-react';
import type { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
}

export function CommentCard({ comment, onLike, onReply }: CommentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
            alt={comment.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{comment.author}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>
      
      <p className="mt-3 text-gray-700">{comment.text}</p>
      
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors"
        >
          <Heart size={18} className={comment.likes > 0 ? 'fill-pink-500 text-pink-500' : ''} />
          <span>{comment.likes}</span>
        </button>
        
        <button
          onClick={() => onReply(comment.id)}
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <MessageCircle size={18} />
          <span>{comment.replies.length}</span>
        </button>
      </div>
      
      {comment.replies.length > 0 && (
        <div className="ml-8 mt-4 border-l-2 border-gray-100 pl-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}