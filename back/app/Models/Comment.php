<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    /**
     * モデルのIDが自動増分することを指示
     *
     * @var bool
     */
    public $incrementing = false;
    /**
     * 主キーIDのデータ型
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * 挿入を許可する属性
     *
     * @var array
     */
    protected $fillable = [
        'comment',
        'user_id',
        'post_id'
    ];

    /**
     * コメントしているユーザーを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * コメントした投稿を取得
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

}
