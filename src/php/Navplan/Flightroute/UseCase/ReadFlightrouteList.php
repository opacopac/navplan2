<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\FlightrouteListResponse;
use Navplan\Flightroute\Domain\ReadFlightrouteListRequest;


class ReadFlightrouteList {
    private $flightrouteRepo;
    private $tokenService;
    private $userRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepo();
        $this->tokenService = $config->getTokenService();
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
    }


    public function read(ReadFlightrouteListRequest $request): FlightrouteListResponse {
        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || $email === '') {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        return new FlightrouteListResponse(
            $this->flightrouteRepo->readList($user)
        );
    }
}