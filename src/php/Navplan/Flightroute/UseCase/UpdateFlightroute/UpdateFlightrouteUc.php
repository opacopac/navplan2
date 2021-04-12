<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\UpdateFlightroute;

use InvalidArgumentException;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\FlightrouteResponse;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class UpdateFlightrouteUc implements IUpdateFlightrouteUc {
    public function __construct(
        private IFlightrouteRepo $flightrouteRepo,
        private ITokenService $tokenService,
        private IUserRepo $userRepo
    ) {
    }


    public function update(UpdateFlightrouteRequest $request): FlightrouteResponse {
        $email = $this->tokenService->getEmailFromToken($request->token);
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
