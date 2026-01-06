<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Query;

use Navplan\Airspace\Domain\Model\Fir;


interface IFirReadByIcaosQuery {
    /**
     * @param string[] $icaos
     * @return Fir[]
     */
    function readByIcaos(array $icaos): array;
}


