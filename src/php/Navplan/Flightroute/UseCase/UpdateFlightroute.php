<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Domain\UpdateFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;


class UpdateFlightroute {
    private $flightrouteRepo;
    private $userRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepo();
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
    }


    public function update(UpdateFlightrouteRequest $request): FlightrouteResponse {
        $email = UserHelper::getEmailFromToken($request->token);
        if (!$email || $email === '') {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        $existingFlightroute = $this->flightrouteRepo->read($request->flightroute->id, $user);
        if (!$existingFlightroute) {
            throw new InvalidArgumentException('no flightroute with this id of current user found');
        }

        return new FlightrouteResponse(
            $this->flightrouteRepo->update($request->flightroute, $user)
        );
    }
}
