<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Service;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\User\Domain\Model\User;


interface IAircraftService
{
    /**
     * @param User $user
     * @return Aircraft[]
     */
    function readList(string $token): array;

    function read(int $aircraftId, string $token): Aircraft;
}