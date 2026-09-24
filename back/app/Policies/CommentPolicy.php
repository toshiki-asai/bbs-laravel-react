<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Comment;
use App\Models\Post;

class CommentPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function delete(User $user, Comment $comment, Post $post): bool
    {
        return $user->id === $post->user_id || $user->id === $comment->user_id && $post->id === $comment->post_id;
    }

}
