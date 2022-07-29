<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Service\IFlightrouteRepo;
use Navplan\User\DomainModel\User;


class MockFlightrouteRepo implements IFlightrouteRepo {
    public array $addArgs;
    public Flightroute $addResult;
    public array $deleteArgs;
    public array $readArgs;
    public ?Flightroute $readResult;
    public array $readByHashArgs;
    public ?Flightroute $readByHashResult;
    public array $readListArgs;
    public array $readListResult;
    public array $readSharedArgs;
    public ?Flightroute $readSharedResult;
    public array $updateArgs;
    public Flightroute $updateResult;


    function add(Flightroute $flightroute, ?User $user): Flightroute {
        $this->addArgs = [$flightroute, $user];
        return $this->addResult;
    }


    function delete(int $flightrouteId, User $user) {
        $this->deleteArgs = [$flightrouteId, $user];
    }


    function read(int $flightrouteId, User $user): ?Flightroute {
        $this->readArgs = [$flightrouteId, $user];
        return $this->readResult;
    }


    function readByHash(string $flightrouteHash): ?Flightroute {
        $this->readByHashArgs = [$flightrouteHash];
        return $this->readByHashResult;
    }


    function readList(User $user): array {
        $this->readListArgs = [$user];
        return $this->readListResult;
    }


    function readByShareId(string $shareId): ?Flightroute {
        $this->readSharedArgs = [$shareId];
        return $this->readSharedResult;
    }


    function update(Flightroute $flightroute, User $user): Flightroute {
        $this->updateArgs = [$flightroute, $user];
        return $this->updateResult;
    }
}
