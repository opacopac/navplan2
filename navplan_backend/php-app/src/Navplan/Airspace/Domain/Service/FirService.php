<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Service;

use Navplan\Airspace\Domain\Model\Fir;
use Navplan\Airspace\Domain\Query\IFirReadByIcaoQuery;


class FirService implements IFirService {
    public function __construct(
        private readonly IFirReadByIcaoQuery $readByIcaoQuery
    ) {
    }


    public function readByIcao(string $icao): ?Fir {
        return $this->readByIcaoQuery->readByIcao($icao);
    }
}

