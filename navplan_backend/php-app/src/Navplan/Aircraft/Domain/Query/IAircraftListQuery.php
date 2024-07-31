<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;


interface IAircraftListQuery
{
    /**
     * @param int $userId
     * @return Aircraft[]
     */
    function readList(int $userId): array;
}
