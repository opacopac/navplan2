<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadFlightrouteList;

use InvalidArgumentException;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class ReadFlightrouteListUc implements IReadFlightrouteListUc {
    public function __construct(
        private IFlightrouteRepo $flightrouteRepo,
        private ITokenService $tokenService,
        private IUserRepo $userRepo
    ) {
    }


    public function read(ReadFlightrouteListRequest $request): ReadFlightrouteListResponse {
        $email = $this->tokenService->getEmailFromToken($request->token);
        if (!$email || $email === '') {
            throw new InvalidArgumentException('invalid token');
        }

        $user = $this->userRepo->readUser($email);
        if (!$user) {
            throw new InvalidArgumentException('user not found');
        }

        return new ReadFlightrouteListResponse(
            $this->flightrouteRepo->readList($user)
        );
    }
}
