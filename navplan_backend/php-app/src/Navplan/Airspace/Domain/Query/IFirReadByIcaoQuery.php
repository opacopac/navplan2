<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Query;

use Navplan\Airspace\Domain\Model\Fir;


interface IFirReadByIcaoQuery {
    /**
     * @param string $icao
     * @return Fir|null
     */
    function readByIcao(string $icao): ?Fir;
}

