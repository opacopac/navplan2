<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\DeleteFlightroute;

use InvalidArgumentException;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class DeleteFlightrouteUc implements IDeleteFlightrouteUc {
    public function __construct(
        private IFlightrouteRepo $flightrouteRepo,
        private ITokenService $tokenService,
        private IUserRepo $userRepo
    ) {
    }


    public function delete(DeleteFlightrouteRequest $request): void
    {
        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || $email === '') {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        $this->flightrouteRepo->delete($request->flightrouteId, $user);

        // TODO: return success/error?
    }
}
