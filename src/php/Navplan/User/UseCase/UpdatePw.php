<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\Domain\UpdatePwRequest;
use Navplan\User\Domain\User;
use Navplan\User\Domain\UserResponse;


class UpdatePw {
    private $userRepo;
    private $tokenService;
    private $httpService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $config->getTokenService();
        $this->httpService = $config->getSystemServiceFactory()->getHttpService();
    }


    public function updatePassword(UpdatePwRequest $request): UserResponse {
        $email = $this->tokenService->getEmailFromToken($request->token);

        if (!User::checkPwFormat($request->newPassword)) {
            return new UserResponse(-1, 'error: invalid new password format');
        }

        if (!$email || !User::checkEmailFormat($email) || !$this->userRepo->checkEmailExists($email)) {
            return new UserResponse(-2, 'error: invalid token');
        }

        if (!User::checkPwFormat($request->oldPassword) || !$this->userRepo->verifyPwHash($email, $request->oldPassword)) {
            return new UserResponse(-3, 'error: invalid old password');
        }

        $this->userRepo->updatePassword($email, $request->newPassword);

        return new UserResponse(0, NULL, $email, $request->token);
    }
}
