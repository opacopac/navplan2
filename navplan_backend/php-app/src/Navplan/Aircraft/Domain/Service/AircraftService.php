<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Service;

use InvalidArgumentException;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;


class AircraftService implements IAircraftService
{
    public function __construct(
        private ITokenService $tokenService,
        private IUserRepo $userRepo,
        private IAircraftListQuery $aircraftListQuery,
        private IAircraftByIdQuery $aircraftByIdQuery
    )
    {
    }


    function readList(string $token): array
    {
        $user = $this->getUserOrThrow($token);

        return $this->aircraftListQuery->readList($user);
    }


    function read(int $aircraftId, string $token): Aircraft
    {
        $user = $this->getUserOrThrow($token);

        return $this->aircraftByIdQuery->read($aircraftId, $user);
    }


    private function getUserOrThrow(string $token): User {
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
