<?php

namespace App\Services;

use App\Ai\Agents\DraftGenerater;
use App\Enums\Length;
use App\Enums\Mood;
use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Image;
use Illuminate\Support\Str;

class PostService
{
    public function __construct(private PostRepositoryInterface $postRepository) {}

    public function findPost(string $id): ?Post
    {
        return $this->postRepository->find($id);
    }

    public function findPostWithUser(string $id): ?Post
    {
        $relation = 'user:id,name';
        return $this->postRepository->findWithRelation($id, $relation);
    }

    public function getPostsWithPagination(int $perPage = 10): LengthAwarePaginator
    {
        return $this->postRepository->getPaginated($perPage);
    }

    public function createPost(string $user_id, array $data, ?string $ai_summary = null): Post
    {
        $data['user_id'] = $user_id;
        if($ai_summary){
            $data['ai_summary'] = $ai_summary;
        }
        return $this->postRepository->create($data);
    }

    public function updatePost(string $id, array $data): bool
    {
        return $this->postRepository->update($id, $data);
    }

    public function deletePost(string $id): bool
    {
        return $this->postRepository->delete($id);
    }

    public function createAndSaveImage(string $id, string $content): bool
    {
        return (bool) Image::of('次の文章を読み取り、イメージ画像を生成してください。\n'.$content)
            ->quality('medium')
            //->landscape()
            ->timeout(120)
            ->generate(Lab::Gemini, 'gemini-3.1-flash-lite-image')
            ->storePubliclyAs($id.'.jpg');
    }

    public function createAiSummary(string $content): string
    {
        return Str::of($content)->summarize(
            sentences: 3,
            provider: Lab::Gemini,
            model: 'gemini-3.5-flash-lite',
            timeout: 120,
        );
    }

    public function generateDraft(array $data): ?string
    {
        $mood = Mood::tryFrom($data['mood'])?->word();
        $length = Length::tryFrom($data['length'])?->word();
        $body = <<<AI_PROMPT
        1.タイトル: {$data['title']}
        2.本文の雰囲気: {$mood}
        3.本文の長さ: {$length}
        4.キーワード: {$data['keyword']}
        AI_PROMPT;

        try {
            $response = (new DraftGenerater)->prompt(
                $body,
                provider: Lab::Gemini,
                model: 'gemini-3.5-flash-lite',
                timeout: 120,
            );
        } catch(Exception $e) {
            return null;
        }

        return $response['draft'];
    }
}
