<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;


interface IReadNotamsByKeyQuery {
    /**
     * Loads NOTAMs from the database by their NOTAM key.
     *
     * @param string $notamKey The NOTAM key to search for
     * @return array Array of associative arrays with keys: id, icao, notam
     */
    function readNotamsByKey(string $notamKey): array;
}

