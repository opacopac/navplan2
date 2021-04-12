<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\CreateFlightroute;

use InvalidArgumentException;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\FlightrouteResponse;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class CreateFlightrouteUc implements ICreateFlightrouteUc {
    public function __construct(
        private IFlightrouteRepo $flightrouteRepo,
        private ITokenService $tokenService,
        private IUserRepo $userRepo
    ) {
    }


    public function create(CreateFlightrouteRequest $request): FlightrouteResponse {
        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || $email === '') {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        return new FlightrouteResponse(
            $this->flightrouteRepo->add($request->flightroute, $user)
        );
    }
}
