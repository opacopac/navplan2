<?php declare(strict_types=1);

namespace Navplan\User\UseCase\Login;

use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\UseCase\UserResponse;


class LoginUc implements ILoginUc {
    public function __construct(
        private IUserRepo $userRepo,
        private ITokenService $tokenService
    ) {
    }


    public function login(LoginRequest $request): UserResponse {
        if (!$request->email) {
            return new UserResponse(-1, 'error: email missing');
        }

        if (!$request->password) {
            return new UserResponse(-2, 'error: password missing');
        }

        if (!User::checkEmailFormat($request->email) || !$this->userRepo->checkEmailExists($request->email)) {
            return new UserResponse(-1, 'error: invalid email');
        }

        if (!User::checkPwFormat($request->password) || !$this->userRepo->verifyPwHash($request->email, $request->password)) {
            return new UserResponse(-2, 'error: invalid password');
        }

        $token = $this->tokenService->createToken($request->email, $request->rememberMe);
        return new UserResponse(0, NULL, $request->email, $token);
    }
}
