<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting;

use Navplan\AerodromeReporting\Domain\Service\IReportingPointService;
use Navplan\AerodromeReporting\Persistence\Repo\DbReportingPointRepo;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;


class ProdAerodromeReportingDiContainer implements IAerodromeReportingDiContainer
{
    private IRestController $reportingPointController;
    private IReportingPointService $reportingPointService;


    public function __construct(
        private IDbService   $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getReportingPointController(): IRestController
    {
        if (!isset($this->reportingPointController)) {
            $this->reportingPointController = new AdReportingPointController(
                $this->httpService,
                $this->getReportingPointService()
            );
        }

        return $this->reportingPointController;
    }


    public function getReportingPointService(): IReportingPointService
    {
        if (!isset($this->reportingPointService)) {
            $this->reportingPointService = new DbReportingPointRepo($this->dbService);
        }

        return $this->reportingPointService;
    }
}
