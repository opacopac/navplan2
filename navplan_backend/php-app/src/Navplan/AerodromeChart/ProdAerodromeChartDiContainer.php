<?php declare(strict_types=1);

namespace Navplan\AerodromeChart;

use Navplan\AerodromeChart\Domain\Service\AirportChartService;
use Navplan\AerodromeChart\Domain\Service\IAirportChartRepo;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Persistence\Repo\DbAirportChartRepo;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;


class ProdAerodromeChartDiContainer implements IAerodromeChartDiContainer
{
    private IRestController $airportChartController;
    private IAirportChartService $airportChartService;
    private IAirportChartRepo $airportChartRepo;


    public function __construct(
        private IDbService $dbService,
        private IFileService $fileService,
        private IImageService $imageService,
        private IHttpService $httpService
    )
    {
    }


    public function getAirportChartController(): IRestController
    {
        if (!isset($this->airportChartController)) {
            $this->airportChartController = new AdChartController(
                $this->httpService,
                $this->getAirportChartService(),
                $this->getAirportChartRepo()
            );
        }

        return $this->airportChartController;
    }


    function getAirportChartService(): IAirportChartService
    {
        if (!isset($this->airportChartService)) {
            $this->airportChartService = new AirportChartService(
                $this->fileService,
                $this->imageService
            );
        }

        return $this->airportChartService;
    }


    function getAirportChartRepo(): IAirportChartRepo
    {
        if (!isset($this->airportChartRepo)) {
            $this->airportChartRepo = new DbAirportChartRepo($this->dbService);
        }

        return $this->airportChartRepo;
    }
}
