<?php declare(strict_types=1);

namespace Navplan\User\UseCase\ResetPw;

use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\UseCase\UserResponse;


class ResetPwUc implements IResetPwUc {
    public function __construct(
        private IUserRepo $userRepo,
        private ITokenService $tokenService,
    ) {
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
