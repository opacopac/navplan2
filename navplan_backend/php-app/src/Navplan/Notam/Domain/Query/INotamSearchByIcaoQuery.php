<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Notam\Domain\Model\Notam;


interface INotamSearchByIcaoQuery {
    /**
     * @param string $airportIcao
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByIcao(string $airportIcao, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
