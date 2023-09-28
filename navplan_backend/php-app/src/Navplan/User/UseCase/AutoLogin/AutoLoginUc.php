<?php declare(strict_types=1);

namespace Navplan\User\UseCase\AutoLogin;

use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\UseCase\UserResponse;


class AutoLoginUc implements IAutoLoginUc {
    public function __construct(private ITokenService $tokenService) {
    }


    public function autologin(AutoLoginRequest $request): UserResponse {
        if (!$request->token) {
            return new UserResponse(-1, 'error: token is missing');
        }

        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || $email === "") {
            return new UserResponse(-1, 'error: invalid token');
        }

        return new UserResponse(0, NULL, $email, $request->token);
    }
}
