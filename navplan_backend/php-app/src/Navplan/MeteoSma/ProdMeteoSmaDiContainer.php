<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Persistence\Service\DbMeteoSmaRepo;
use Navplan\MeteoSma\Rest\Service\MeteoSmaController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ITimeService;


class ProdMeteoSmaDiContainer implements IMeteoSmaDiContainer {
    private IRestController $meteoSmaController;
    private IMeteoSmaService $meteoService;


    public function __construct(
        private IDbService $dbService,
        private ITimeService $timeService,
        private IHttpService $httpService
    ) {
    }


    public function getMeteoSmaController(): IRestController {
        if (!isset($this->meteoSmaController)) {
            $this->meteoSmaController = new MeteoSmaController(
                $this->getMeteoSmaService(),
                $this->httpService
            );
        }

        return $this->meteoSmaController;
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
