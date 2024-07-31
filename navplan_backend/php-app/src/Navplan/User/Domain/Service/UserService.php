<?php declare(strict_types=1);

namespace Navplan\User\Domain\Service;

use InvalidArgumentException;
use Navplan\User\Domain\Model\User;


class UserService implements IUserService
{
    public function __construct(
        private readonly TokenService $tokenService,
        private readonly IUserRepo $userRepo
    )
    {
    }

    function getUserOrThrow(string $token): User
    {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        return $user;
    }
}
