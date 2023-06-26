<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Service;

use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Command\IFlightrouteCreateCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteDeleteCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteUpdateCommand;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByHashQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByShareIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;


class FlightrouteService implements IFlightrouteService {
    public function __construct(
        private ITokenService $tokenService,
        private IUserRepo $userRepo,
        private IFlightrouteListQuery $flightrouteListQuery,
        private IFlightrouteByIdQuery $flightrouteByIdQuery,
        private IFlightrouteByShareIdQuery $flightrouteByShareIdQuery,
        private IFlightrouteByHashQuery $flightrouteByHashQuery,
        private IFlightrouteCreateCommand $flightrouteAddCommand,
        private IFlightrouteDeleteCommand $flightrouteDeleteCommand,
        private IFlightrouteUpdateCommand $flightrouteUpdateCommand
    ) {
    }


    public function create(Flightroute $flightroute, string $token): Flightroute {
        $user = $this->getUserOrThrow($token);

        return $this->flightrouteAddCommand->create($flightroute, $user);
    }


    public function createShared(Flightroute $flightroute): Flightroute {
        // check for existing flightroute
        $hash = hash("md5", serialize($flightroute));
        $existingFlightroute = $this->flightrouteByHashQuery->readByHash($hash);
        if ($existingFlightroute !== NULL) {
            return $existingFlightroute;
        }

        // create shared flightroute
        $flightroute->shareId = StringNumberHelper::createRandomString(10);
        $flightroute->hash = $hash;

        return $this->flightrouteAddCommand->create($flightroute, NULL);
    }


    function delete(int $flightrouteId, string $token): bool {
        $user = $this->getUserOrThrow($token);
        $this->flightrouteDeleteCommand->delete($flightrouteId, $user);

        return true; // TODO
    }


    function read(int $flightrouteId, string $token): Flightroute {
        $user = $this->getUserOrThrow($token);

        return $this->flightrouteByIdQuery->read($flightrouteId, $user);
    }


    function readList(string $token): array {
        $user = $this->getUserOrThrow($token);

        return $this->flightrouteListQuery->readList($user);
    }


    function readShared(string $shareId): Flightroute {
        return $this->flightrouteByShareIdQuery->readByShareId($shareId);
    }


    function update(Flightroute $flightroute, string $token): Flightroute {
        $user = $this->getUserOrThrow($token);

        return $this->flightrouteUpdateCommand->update($flightroute, $user);
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
