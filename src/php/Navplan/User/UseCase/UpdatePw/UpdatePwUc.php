<?php declare(strict_types=1);

namespace Navplan\User\UseCase\UpdatePw;

use Navplan\User\DomainModel\User;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;
use Navplan\User\UseCase\UserResponse;


class UpdatePwUc implements IUpdatePwUc {
    public function __construct(
        private IUserRepo $userRepo,
        private ITokenService $tokenService
    ) {
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
