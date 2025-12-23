<?php declare(strict_types=1);

namespace Navplan\Fir\Domain\Service;

use Navplan\Fir\Domain\Model\Fir;
use Navplan\Fir\Domain\Query\IFirReadByIcaoQuery;


class FirService implements IFirService {
    public function __construct(
        private readonly IFirReadByIcaoQuery $readByIcaoQuery
    ) {
    }


    public function readByIcao(string $icao): ?Fir {
        return $this->readByIcaoQuery->readByIcao($icao);
    }
}

