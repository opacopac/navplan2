<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadFlightroute;

use InvalidArgumentException;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\FlightrouteResponse;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class ReadFlightrouteUc implements IReadFlightrouteUc {
    public function __construct(
        private IFlightrouteRepo $flightrouteRepo,
        private ITokenService $tokenService,
        private IUserRepo $userRepo
    ) {
    }


    public function read(ReadFlightrouteRequest $request): FlightrouteResponse {
        $email = $this->tokenService->getEmailFromToken($request->token);
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
