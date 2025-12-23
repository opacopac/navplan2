<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Service;

use Navplan\Airspace\Domain\Model\Fir;


interface IFirService {
    /**
     * @param string $icao
     * @return Fir|null
     */
    function readByIcao(string $icao): ?Fir;
}

