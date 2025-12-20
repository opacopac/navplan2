<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Notam\Domain\Model\Notam;


interface INotamSearchByIcaoQuery {
    /**
     * @param string $airportIcao
     * @param TimestampInterval $interval
     * @return Notam[]
     */
    function searchByIcao(string $airportIcao, TimestampInterval $interval): array;
}
