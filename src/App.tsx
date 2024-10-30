import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { CommentCard } from './components/CommentCard';
import { CommentInput } from './components/CommentInput';
import { useComments } from './hooks/useComments';

function App() {
  const { comments, addComment, likeComment, addReply } = useComments();

  const handleReply = (parentId: string) => {
    const replyText = prompt('Enter your reply:');
    if (!replyText?.trim()) return;
    addReply(parentId, replyText);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <MessageSquarePlus size={32} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Community Chat</h1>
          </div>
          <p className="text-gray-600">Join the conversation and share your thoughts!</p>
        </div>

        <div className="mb-6">
          <CommentInput onSubmit={addComment} />
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onLike={likeComment}
              onReply={handleReply}
            />
          ))}
          {comments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No comments yet. Be the first to start the conversation!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;