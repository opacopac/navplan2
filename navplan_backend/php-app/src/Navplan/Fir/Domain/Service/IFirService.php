<?php declare(strict_types=1);

namespace Navplan\Fir\Domain\Service;

use Navplan\Fir\Domain\Model\Fir;


interface IFirService {
    /**
     * @param string $icao
     * @return Fir|null
     */
    function readByIcao(string $icao): ?Fir;
}

