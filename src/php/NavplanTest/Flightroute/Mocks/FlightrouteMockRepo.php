<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Flightroute\Domain\Flightroute;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\User\Domain\User;


class FlightrouteMockRepo implements IFlightrouteRepo {
    /* @var $addArgs array */
    public $addArgs;
    /* @var $addResult Flightroute */
    public $addResult;
    /* @var $addArgs array */
    public $deleteArgs;
    /* @var $readArgs array */
    public $readArgs;
    /* @var $readResult Flightroute */
    public $readResult;
    /* @var $readByHashArgs array */
    public $readByHashArgs;
    /* @var $readByHashResult Flightroute */
    public $readByHashResult;
    /* @var $readListArgs array */
    public $readListArgs;
    /* @var $readListResult array */
    public $readListResult;
    /* @var $readSharedArgs array */
    public $readSharedArgs;
    /* @var $readSharedResult Flightroute */
    public $readSharedResult;
    /* @var $updateArgs array */
    public $updateArgs;
    /* @var $updateResult Flightroute */
    public $updateResult;


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
