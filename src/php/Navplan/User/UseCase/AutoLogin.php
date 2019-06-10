<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\Domain\AutoLoginRequest;
use Navplan\User\Domain\UserResponse;


class AutoLogin {
    private $userRepo;
    private $tokenService;
    private $httpService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $config->getTokenService();
        $this->httpService = $config->getSystemServiceFactory()->getHttpService();
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
