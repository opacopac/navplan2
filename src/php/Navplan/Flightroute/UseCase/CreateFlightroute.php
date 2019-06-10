<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\CreateFlightrouteRequest;
use Navplan\Flightroute\Domain\FlightrouteResponse;


class CreateFlightroute {
    private $flightrouteRepo;
    private $tokenService;
    private $userRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepo();
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $config->getTokenService();
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
