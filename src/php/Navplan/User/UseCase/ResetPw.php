<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\Domain\ResetPwRequest;
use Navplan\User\Domain\User;
use Navplan\User\Domain\UserResponse;


class ResetPw {
    private $userRepo;
    private $tokenService;
    private $httpService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $config->getTokenService();
        $this->httpService = $config->getSystemServiceFactory()->getHttpService();
    }


    public function resetPassword(ResetPwRequest $request): UserResponse {
        if (!$request->token || $request->token === "") {
            return new UserResponse(-2, 'error: token missing');
        }

        if (!$request->password || $request->password === "") {
            return new UserResponse(-1, 'error: password missing');
        }

        if (!User::checkPwFormat($request->password)) {
            return new UserResponse(-1, 'error: invalid password format');
        }

        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || !User::checkEmailFormat($email)) {
            return new UserResponse(-2, 'error: invalid token');
        }

        if (!$this->userRepo->checkEmailExists($email)) {
            return new UserResponse(-2, 'error: email does not exists');
        }

        $this->userRepo->updatePassword($email, $request->password);
        $token = $this->tokenService->createToken($email, $request->rememberMe);

        return new UserResponse(0, NULL, $email, $token);
    }
}
