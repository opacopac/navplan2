<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\Domain\LoginRequest;
use Navplan\User\Domain\User;
use Navplan\User\Domain\UserResponse;


class Login {
    private $userRepo;
    private $tokenService;
    private $httpService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $config->getTokenService();
        $this->httpService = $config->getSystemServiceFactory()->getHttpService();
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
