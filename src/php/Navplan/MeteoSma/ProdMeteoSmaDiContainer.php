<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Persistence\Service\DbMeteoSmaRepo;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ITimeService;


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
