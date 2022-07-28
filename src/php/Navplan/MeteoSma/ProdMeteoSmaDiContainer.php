<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\DbService\DbMeteoSmaRepo;
use Navplan\MeteoSma\DomainService\IMeteoSmaService;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ITimeService;


class ProdMeteoSmaDiContainer implements IMeteoSmaDiContainer {
    private IMeteoSmaService $meteoService;


    public function __construct(
        private IDbService $dbService,
        private ITimeService $timeService
    ) {
    }


    public function getMeteoSmaService(): IMeteoSmaService {
        if (!isset($this->meteoService)) {
            $this->meteoService = new DbMeteoSmaRepo(
                $this->dbService,
                $this->timeService
            );
        }

        return $this->meteoService;
    }
}
