<?php declare(strict_types=1);

namespace Navplan\AerodromeChart;

use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Persistence\Repo\DbAirportChartRepo;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;


class ProdAerodromeChartDiContainer implements IAerodromeChartDiContainer
{
    private IRestController $airportChartController;
    private IAirportChartService $airportChartService;


    public function __construct(
        private IDbService   $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getAirportChartController(): IRestController
    {
        if (!isset($this->airportChartController)) {
            $this->airportChartController = new AdChartController(
                $this->httpService,
                $this->getAirportChartService()
            );
        }

        return $this->airportChartController;
    }


    function getAirportChartService(): IAirportChartService
    {
        if (!isset($this->airportChartService)) {
            $this->airportChartService = new DbAirportChartRepo($this->dbService);
        }

        return $this->airportChartService;
    }
}
