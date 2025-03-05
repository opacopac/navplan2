<?php declare(strict_types=1);

namespace Navplan\User\UseCase\AutoLogin;

use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\UseCase\UserResponse;


class AutoLoginUc implements IAutoLoginUc {
    public function __construct(private ITokenService $tokenService) {
    }


    public function autologin(string $token): UserResponse {
        if (!$token) {
            return new UserResponse(-1, 'error: token is missing');
        }

        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            return new UserResponse(-1, 'error: invalid token');
        }

        return new UserResponse(0, NULL, $email, $token);
    }
}
