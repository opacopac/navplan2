<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Service;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\User\Domain\Service\IUserService;


class AircraftService implements IAircraftService
{
    public function __construct(
        private IUserService $userService,
        private IAircraftListQuery $aircraftListQuery,
        private IAircraftByIdQuery $aircraftByIdQuery,
        private IAircraftCreateCommand $aircraftCreateCommand,
        private IAircraftUpdateCommand $aircraftUpdateCommand,
        private IAircraftDeleteCommand $aircraftDeleteCommand
    )
    {
    }


    function readList(string $token): array
    {
        $user = $this->userService->getUserOrThrow($token);

        return $this->aircraftListQuery->readList($user->id);
    }


    function read(int $aircraftId, string $token): Aircraft
    {
        $user = $this->userService->getUserOrThrow($token);

        return $this->aircraftByIdQuery->read($aircraftId, $user->id);
    }


    public function create(Aircraft $aircraft, string $token): Aircraft
    {
        $user = $this->userService->getUserOrThrow($token);

        return $this->aircraftCreateCommand->create($aircraft, $user->id);
    }



    public function duplicate(int $aircraftId, string $token): Aircraft
    {
        $user = $this->userService->getUserOrThrow($token);
        $newAircraft = $this->aircraftByIdQuery->read($aircraftId, $user->id);
        $newAircraft->id = 0;
        $newAircraft->registration .= '(2)';

        return $this->create($newAircraft, $token);
    }



    public function update(Aircraft $aircraft, string $token): Aircraft
    {
        $user = $this->userService->getUserOrThrow($token);

        return $this->aircraftUpdateCommand->update($aircraft, $user->id);
    }


    public function delete(int $aircraftId, string $token): bool
    {
        $user = $this->userService->getUserOrThrow($token);

        $this->aircraftDeleteCommand->delete($aircraftId, $user->id);

        return true; // TODO
    }
}
