"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Loader2, MessageSquare, Check, X, Trash2 } from "lucide-react";
import { useComments, useApproveComment, useRejectComment, useReplyToComment, useDeleteComment } from "@/hooks/use-api";
import { Comment } from "@/lib/api";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loadingStates, setLoadingStates] = useState<{[key: string]: {approve: boolean, reject: boolean, reply: boolean}}>({});

  // API hooks
  const [commentsState, commentsActions] = useComments();
  const [approveCommentState, approveCommentActions] = useApproveComment();
  const [rejectCommentState, rejectCommentActions] = useRejectComment();
  const [replyCommentState, replyCommentActions] = useReplyToComment();
  const [deleteCommentState, deleteCommentActions] = useDeleteComment();

  // Load comments on component mount
  useEffect(() => {
    loadComments();
  }, [statusFilter]);

  // Update local state when API data changes
  useEffect(() => {
    if (commentsState.data) {
      console.log('Comments loaded:', commentsState.data.length, 'comments');
      console.log('Current status filter:', statusFilter);
      console.log('Comments statuses:', commentsState.data.map(c => c.status));
      setComments(commentsState.data);
      // Initialize loading states for new comments
      const newLoadingStates: {[key: string]: {approve: boolean, reject: boolean, reply: boolean}} = {};
      commentsState.data.forEach(comment => {
        newLoadingStates[comment.id] = {
          approve: false,
          reject: false,
          reply: false
        };
      });
      setLoadingStates(newLoadingStates);
    }
  }, [commentsState.data, statusFilter]);

  const loadComments = async () => {
    try {
      const params = statusFilter ? { status: statusFilter } : undefined;
      console.log('Loading comments with filter:', statusFilter, 'params:', params);
      await commentsActions.execute(params);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error("Failed to load comments");
    }
  };

  const handleApproveComment = async (id: string) => {
    try {
      setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], approve: true } }));
      await approveCommentActions.execute(id);
      toast.success("Comment approved successfully!");
      loadComments();
    } catch (error) {
      toast.error("Failed to approve comment");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], approve: false } }));
    }
  };

  const handleRejectComment = async (id: string) => {
    try {
      setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], reject: true } }));
      await rejectCommentActions.execute(id);
      toast.success("Comment rejected successfully!");
      loadComments();
    } catch (error) {
      toast.error("Failed to reject comment");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], reject: false } }));
    }
  };

  const handleReplyToComment = async () => {
    if (!selectedComment || !replyText.trim()) return;

    try {
      setLoadingStates(prev => ({ ...prev, [selectedComment.id]: { ...prev[selectedComment.id], reply: true } }));
      await replyCommentActions.execute(selectedComment.id, replyText);
      toast.success("Reply sent successfully!");
      setShowReplyDialog(false);
      setReplyText("");
      setSelectedComment(null);
      loadComments();
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setLoadingStates(prev => ({ ...prev, [selectedComment.id]: { ...prev[selectedComment.id], reply: false } }));
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteCommentActions.execute(id);
        toast.success("Comment deleted successfully!");
        loadComments();
      } catch (error) {
        toast.error("Failed to delete comment");
      }
    }
  };

  const openReplyDialog = (comment: Comment) => {
    setSelectedComment(comment);
    setShowReplyDialog(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500 hover:bg-green-600';
      case 'REJECTED':
        return 'bg-red-500 hover:bg-red-600';
      case 'PENDING':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (commentsState.loading && comments.length === 0) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading comments...</span>
        </div>
      </div>
    );
  }

  if (commentsState.error && comments.length === 0) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load comments</p>
          <button 
            onClick={loadComments}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
        
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              console.log('Status filter changed from:', statusFilter, 'to:', e.target.value);
              setStatusFilter(e.target.value);
            }}
            className="border rounded-lg px-3 py-1 text-sm"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start gap-3 pb-2">
              <Avatar>
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {comment.visitor?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base font-semibold">
                  {comment.visitor?.name || 'Anonymous'}
                </CardTitle>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
                {comment.property && (
                  <p className="text-xs text-gray-500">
                    Property: {comment.property.name}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {comment.id}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              {comment.rating && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < comment.rating! ? "text-orange-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600">{comment.content}</p>

              {comment.reply && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-1">Admin Reply:</p>
                  <p className="text-sm text-gray-600">{comment.reply}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Badge className={getStatusBadgeColor(comment.status)}>
                  {comment.status === 'PENDING' ? 'Pending' : 
                   comment.status === 'APPROVED' ? 'Approved' : 
                   comment.status === 'REJECTED' ? 'Rejected' : 
                   comment.status}
                </Badge>
              </div>

              <div className="flex gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-3 py-2"
                  onClick={() => handleApproveComment(comment.id)}
                  disabled={loadingStates[comment.id]?.approve || comment.status === 'APPROVED'}
                >
                  {loadingStates[comment.id]?.approve ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    "Approve"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-3 py-2"
                  onClick={() => handleRejectComment(comment.id)}
                  disabled={loadingStates[comment.id]?.reject || comment.status === 'REJECTED'}
                >
                  {loadingStates[comment.id]?.reject ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    "Reject"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-3 py-2"
                  onClick={() => openReplyDialog(comment)}
                  disabled={loadingStates[comment.id]?.reply}
                >
                  {loadingStates[comment.id]?.reply ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    "Reply"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {comments.length === 0 && !commentsState.loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No comments found.</p>
        </div>
      )}

      {/* Reply Dialog */}
      {showReplyDialog && selectedComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Reply to Comment</h3>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Comment:</strong> {selectedComment.content}
            </p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Enter your reply..."
              className="w-full border rounded-lg px-3 py-2 mb-4"
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReplyDialog(false);
                  setReplyText("");
                  setSelectedComment(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReplyToComment}
                disabled={!replyText.trim() || (selectedComment && loadingStates[selectedComment.id]?.reply)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {selectedComment && loadingStates[selectedComment.id]?.reply ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Send Reply"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
