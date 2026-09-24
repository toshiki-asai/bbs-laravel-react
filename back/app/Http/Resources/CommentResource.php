<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'comment' => $this->comment,
            'created_at' => $this->created_at,
            'user_name' => $this->whenLoaded('user') ? $this->user->name : null,
            'can_delete' => $request->user()->can('delete', [$this->resource, $this->post]),
        ];
    }
}
