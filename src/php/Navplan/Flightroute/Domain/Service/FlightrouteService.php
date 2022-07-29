<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Service;

use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\User\DomainModel\User;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class FlightrouteService implements IFlightrouteService {
    public function __construct(
        public ITokenService $tokenService,
        public IUserRepo $userRepo,
        public IFlightrouteRepo $flightrouteRepo
    ) {
    }


    public function create(Flightroute $flightroute, string $token): Flightroute {
        $user = $this->getUser($token);

        return $this->flightrouteRepo->add($flightroute, $user);
    }


    public function createShared(Flightroute $flightroute): Flightroute {
        // check for existing flightroute
        $hash = hash("md5", serialize($flightroute));
        $existingFlightroute = $this->flightrouteRepo->readByHash($hash);
        if ($existingFlightroute !== NULL) {
            return $existingFlightroute;
        }

        // create shared flightroute
        $flightroute->shareId = StringNumberHelper::createRandomString(10);
        $flightroute->hash = $hash;

        return $this->flightrouteRepo->add($flightroute, NULL);
    }


    function delete(int $flightrouteId, string $token): bool {
        $user = $this->getUser($token);
        $this->flightrouteRepo->delete($flightrouteId, $user);

        return true; // TODO
    }


    function read(int $flightrouteId, string $token): Flightroute {
        $user = $this->getUser($token);

        return $this->flightrouteRepo->read($flightrouteId, $user);
    }


    function readList(string $token): array {
        $user = $this->getUser($token);

        return $this->flightrouteRepo->readList($user);
    }


    function readShared(string $shareId): Flightroute {
        return $this->flightrouteRepo->readByShareId($shareId);
    }


    function update(Flightroute $flightroute, string $token): Flightroute {
        $user = $this->getUser($token);

        return $this->flightrouteRepo->update($flightroute, $user);
    }


    private function getUser(string $token): User {
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
