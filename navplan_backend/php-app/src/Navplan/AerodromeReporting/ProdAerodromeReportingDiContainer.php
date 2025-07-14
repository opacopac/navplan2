<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Domain\Service\IReportingPointService;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Persistence\Repo\DbReportingPointRepo;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;


class ProdAerodromeReportingDiContainer implements IAerodromeReportingDiContainer
{
    private IRestController $reportingPointController;
    private IReportingPointService $reportingPointService;
    private IAerodromeReportingByExtentQuery $aerodromeReportingByExtentQuery;
    private IAerodromeReportingByPositionQuery $aerodromeReportingByPositionQuery;
    private IAerodromeReportingByTextQuery $aerodromeReportingByTextQuery;
    private IAerodromeReportingByIcaoQuery $aerodromeReportingByIcaoQuery;


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
                $this->getAerodromeReportingByExtentQuery(),
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


    public function getAerodromeReportingByExtentQuery(): IAerodromeReportingByExtentQuery
    {
        if (!isset($this->aerodromeReportingByExtentQuery)) {
            $this->aerodromeReportingByExtentQuery = new DbAerodromeReportingByExtentQuery($this->dbService);
        }

        return $this->aerodromeReportingByExtentQuery;
    }


    public function getAerodromeReportingByPositionQuery(): IAerodromeReportingByPositionQuery
    {
        if (!isset($this->aerodromeReportingByPositionQuery)) {
            $this->aerodromeReportingByPositionQuery = new DbAerodromeReportingByPositionQuery($this->dbService);
        }

        return $this->aerodromeReportingByPositionQuery;
    }


    public function getAerodromeReportingByTextQuery(): IAerodromeReportingByTextQuery
    {
        if (!isset($this->aerodromeReportingByTextQuery)) {
            $this->aerodromeReportingByTextQuery = new DbAerodromeReportingByTextQuery($this->dbService);
        }

        return $this->aerodromeReportingByTextQuery;
    }


    public function getAerodromeReportingByIcaoQuery(): IAerodromeReportingByIcaoQuery
    {
        if (!isset($this->aerodromeReportingByIcaoQuery)) {
            $this->aerodromeReportingByIcaoQuery = new DbAerodromeReportingByIcaoQuery($this->dbService);
        }

        return $this->aerodromeReportingByIcaoQuery;
    }
}
