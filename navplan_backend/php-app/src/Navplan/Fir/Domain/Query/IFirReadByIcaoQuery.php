<?php declare(strict_types=1);

namespace Navplan\Fir\Domain\Query;

use Navplan\Fir\Domain\Model\Fir;


interface IFirReadByIcaoQuery {
    /**
     * @param string $icao
     * @return Fir|null
     */
    function readByIcao(string $icao): ?Fir;
}

