<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;


use Navplan\Notam\Domain\Model\RawNotam;

interface IReadNotamsByKeyQuery
{
    /**
     * Loads NOTAMs from the database by their NOTAM key.
     *
     * @param string $notamKey
     * @return RawNotam[]
     */
    function readNotamsByKey(string $notamKey): array;
}
