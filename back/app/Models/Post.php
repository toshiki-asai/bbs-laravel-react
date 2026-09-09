<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
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
        'title',
        'content',
        'user_id'
    ];

    /**
     * 投稿しているユーザーを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 投稿のコメントを取得
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

}
