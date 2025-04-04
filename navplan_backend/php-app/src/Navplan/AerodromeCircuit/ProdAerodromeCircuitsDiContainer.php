<?php declare(strict_types=1);

namespace Navplan\AerodromeCircuit;

use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\AerodromeCircuit\Persistence\Repo\DbAirportCircuitRepo;
use Navplan\AerodromeCircuit\Rest\Controller\AdCircuitController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;


class ProdAerodromeCircuitsDiContainer implements IAerodromeCircuitDiContainer
{
    private IRestController $airportCircuitController;
    private IAirportCircuitService $airportCircuitService;


    public function __construct(
        private IDbService   $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getAirportCircuitController(): IRestController
    {
        if (!isset($this->airportCircuitController)) {
            $this->airportCircuitController = new AdCircuitController(
                $this->httpService,
                $this->getAirportCircuitService()
            );
        }

        return $this->airportCircuitController;
    }


    function getAirportCircuitService(): IAirportCircuitService
    {
        if (!isset($this->airportCircuitService)) {
            $this->airportCircuitService = new DbAirportCircuitRepo($this->dbService);
        }

        return $this->airportCircuitService;
    }
}
