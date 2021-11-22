<?php declare(strict_types=1);

namespace Navplan\Flightroute\DomainService;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\User\DomainModel\User;


interface IFlightrouteRepo {
    function add(Flightroute $flightroute, ?User $user): Flightroute;

    function update(Flightroute $flightroute, User $user): Flightroute;

    function delete(int $flightrouteId, User $user);

    function read(int $flightrouteId, User $user): ?Flightroute;

    function readByHash(string $flightrouteHash): ?Flightroute;

    function readByShareId(string $shareId): ?Flightroute;

    function readList(User $user): array;
}
