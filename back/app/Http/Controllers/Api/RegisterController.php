<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StorePreRegisterRequest;
use App\Http\Requests\Api\StoreRegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\PendingRegistrationSession;
use App\Services\RegistrationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function __construct(
        protected RegistrationService $registrationService,
        protected PendingRegistrationSession $pendingRegistrationSession
    ) {}

    public function storePreRegister(StorePreRegisterRequest $request): JsonResponse
    {
        $request->validated();

        $email = $request->input('email');

        //既にユーザー登録済みの場合、完了をレスポンス
        if($this->registrationService->isEmailRegistered($email)){
            //（登録済みのメール案内）

            return response()->json([
                'status' => 'success',
                'message' => 'メールアドレスへ案内を送信しました。',
                'url' => ''
            ], 200);
        }

        $url = $this->registrationService->createVerifyEmailFrontEndUrl($email);

        //（本登録のメール案内）

        return response()->json([
            'status' => 'success',
            'message' => 'メールアドレスへ案内を送信しました。',
            'url' => $url
        ], 200);

    }

    public function verifyEmail(Request $request): JsonResponse
    {
        $email = $request->query('email');

        if($this->registrationService->isEmailRegistered($email)){
            //ユーザー登録済みの場合、404エラーを返す
            return abort(404);
        }

        //セッション登録
        $this->pendingRegistrationSession->store($email);

        return response()->json([
            'status' => 'success',
            'message' => 'メールアドレス認証が完了いたしました。',
        ], 200);
    }

    public function register(Request $request): JsonResponse
    {
        //セッションからメールアドレスを取得
        $email = $this->pendingRegistrationSession->email();
        if($email === null) {
            return abort(404);
        }

        //ユーザー登録済みかを確認
        if($this->registrationService->isEmailRegistered($email)) {
            $this->pendingRegistrationSession->forget();
            return abort(404);
        }

        return response()->json([
            'status' => 'success',
            'message' => '認証済みメールアドレスを確認しました。',
            'email' => $email
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterRequest $request): JsonResponse
    {
        //セッションからメールアドレスを取得
        $email = $this->pendingRegistrationSession->email();
        if($email === null) {
            return abort(404);
        }

        //ユーザー登録済みかを確認
        if($this->registrationService->isEmailRegistered($email)) {
            $this->pendingRegistrationSession->forget();
            return abort(404);
        }

        $data = $request->validated();
        $user = $this->registrationService->register($data, $email);

        $this->pendingRegistrationSession->forget();

        //自動ログイン
        Auth::login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'ユーザー登録が完了いたしました。',
            'user' => new UserResource($user),
        ], 201);

    }

}
