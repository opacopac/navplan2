<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Domain\ReadFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;


class ReadFlightroute {
    private $flightrouteRepo;
    private $userRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepo();
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
    }


    public function read(ReadFlightrouteRequest $request): FlightrouteResponse {
        $email = UserHelper::getEmailFromToken($request->token);
        if (!$email || $email === '') {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        return new FlightrouteResponse(
            $this->flightrouteRepo->read($request->flightrouteId, $user)
        );
    }
}
