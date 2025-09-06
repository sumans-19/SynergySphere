"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
}

interface TaskCommentsProps {
  taskId: number
  comments?: Comment[]
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Arjun Mehta",
    avatar: "AM",
    content: "I’ve drafted the initial project plan. We can review it in tomorrow’s meeting.",
    timestamp: "3 hours ago",
  },
  {
    id: 2,
    author: "Priya Sharma",
    avatar: "PS",
    content: "I’ll start preparing the presentation slides. Should be done by evening.",
    timestamp: "2 hours ago",
  },
  {
    id: 3,
    author: "Ravi Kumar",
    avatar: "RK",
    content: "I can handle the backend integration tasks this week.",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    author: "Sneha Patel",
    avatar: "SP",
    content: "I’ll collect the client feedback and summarize it for the team.",
    timestamp: "45 minutes ago",
  },
  {
    id: 5,
    author: "Vikram Singh",
    avatar: "VS",
    content: "I’ll coordinate with the testing team and ensure bug reports are tracked.",
    timestamp: "20 minutes ago",
  }

]

export function TaskComments({ taskId, comments = mockComments }: TaskCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setNewComment("")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-playfair)] text-base md:text-lg">
          <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 max-h-80 md:max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2 md:gap-3">
              <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                <AvatarImage src={`/ceholder-svg-key-xtylj.jpg?key=xtylj&key=13pji&height=32&width=32`} />
                <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium text-sm truncate">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground bg-muted p-2 md:p-3 rounded-lg break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="resize-none text-sm"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!newComment.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
