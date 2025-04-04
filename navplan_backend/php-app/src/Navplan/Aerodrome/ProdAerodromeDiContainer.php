<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Persistence\Repo\DbAirportRepo;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;


class ProdAerodromeDiContainer implements IAerodromeDiContainer
{
    private IRestController $airportController;
    private IAirportService $airportService;


    public function __construct(
        private IDbService      $dbService,
        private ILoggingService $loggingService,
        private IHttpService    $httpService
    )
    {
    }


    public function getAirportController(): IRestController
    {
        if (!isset($this->airportController)) {
            $this->airportController = new AirportController(
                $this->httpService,
                $this->getAirportService()
            );
        }

        return $this->airportController;
    }


    public function getAirportService(): IAirportService
    {
        if (!isset($this->airportService)) {
            $this->airportService = new DbAirportRepo(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airportService;
    }
}
