<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Service;

use Navplan\Airspace\Domain\Model\Fir;
use Navplan\Airspace\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Airspace\Domain\Query\IFirReadByIcaosQuery;


class FirService implements IFirService {
    public function __construct(
        private readonly IFirReadByIcaoQuery $readByIcaoQuery,
        private readonly IFirReadByIcaosQuery $readByIcaosQuery
    ) {
    }


    public function readByIcao(string $icao): ?Fir {
        return $this->readByIcaoQuery->readByIcao($icao);
    }


    public function readByIcaos(array $icaos): array {
        return $this->readByIcaosQuery->readByIcaos($icaos);
    }
}

