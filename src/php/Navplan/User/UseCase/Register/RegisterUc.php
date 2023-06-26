<?php declare(strict_types=1);

namespace Navplan\User\UseCase\Register;

use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\UseCase\UserResponse;


class RegisterUc implements IRegisterUc {
    public function __construct(
        private IUserRepo $userRepo,
        private ITokenService $tokenService
    ) {
    }


    public function register(RegisterRequest $request): UserResponse {
        if (!User::checkPwFormat($request->password)) {
            return new UserResponse(-1, 'error: invalid password format');
        }

        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || !User::checkEmailFormat($email)) {
            return new UserResponse(-2, 'error: invalid token');
        }

        if ($this->userRepo->checkEmailExists($email)) {
            return new UserResponse(-3, 'error: email already exists');
        }

        // create new user & token
        $this->userRepo->createUser($email, $request->password);
        $token = $this->tokenService->createToken($email, $request->rememberMe);

        return new UserResponse(0, NULL, $email, $token);
    }
}
