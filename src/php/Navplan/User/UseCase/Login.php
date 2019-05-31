<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\Domain\LoginRequest;
use Navplan\User\Domain\UserResponse;


class Login {
    private $userRepo;
    private $httpService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->httpService = $config->getHttpResponseService();
    }


    public function login(LoginRequest $request): UserResponse {
        if (!$request->email) {
            return new UserResponse(-1, 'error: email missing');
        }

        if (!$request->password) {
            return new UserResponse(-2, 'error: password missing');
        }

        if (!UserHelper::checkEmailFormat($request->email) || !$this->userRepo->checkEmailExists($request->email)) {
            return new UserResponse(-1, 'error: invalid email');
        }

        if (!UserHelper::checkPwFormat($request->password) || !$this->userRepo->verifyPwHash($request->email, $request->password)) {
            return new UserResponse(-2, 'error: invalid password');
        }

        $token = UserHelper::createToken($request->email, $request->rememberMe);
        return new UserResponse(0, NULL, $request->email, $token);
    }
}
