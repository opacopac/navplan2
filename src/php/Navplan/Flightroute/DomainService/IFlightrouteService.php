<?php declare(strict_types=1);

namespace Navplan\Flightroute\DomainService;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\User\DomainModel\User;


interface IFlightrouteService {
    function create(Flightroute $flightroute, string $token): Flightroute;

    function createShared(Flightroute $flightroute): Flightroute;

    function delete(int $flightrouteId, string $token): bool;

    function read(int $flightrouteId, string $token): Flightroute;

    /**
     * @param User $user
     * @return Flightroute[]
     */
    function readList(string $token): array;

    function readShared(string $shareId): Flightroute;

    function update(Flightroute $flightroute, string $token): Flightroute;
}
