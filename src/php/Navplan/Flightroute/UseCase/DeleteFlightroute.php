<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\DeleteFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;


class DeleteFlightroute {
    private $flightrouteRepo;
    private $userRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepoFactory()->createFlightrouteRepo();
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
    }


    public function delete(DeleteFlightrouteRequest $request): void
    {
        $email = UserHelper::getEmailFromToken($request->token);
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
