<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\Domain\Service\SearchService;
use Navplan\Search\Rest\Service\SearchController;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class ProdSearchDiContainer implements ISearchDiContainer
{
    private IRestController $searchController;
    private ISearchService $searchService;


    public function __construct(
        private IHttpService           $httpService,
        private ISearchUserPointUc     $searchUserPointUc,
        private IAirspaceService       $airspaceService,
        private INotamService          $notamService,
        private IAirportService        $airportService,
        private IReportingPointService $reportingPointService,
        private INavaidService         $navaidService,
        private IGeonameService        $geonameService
    )
    {
    }


    public function getSearchController(): IRestController
    {
        if (!isset($this->searchController)) {
            $this->searchController = new SearchController(
                $this->getSearchService(),
                $this->httpService
            );
        }

        return $this->searchController;
    }


    function getSearchService(): ISearchService
    {
        if (!isset($this->searchService)) {
            $this->searchService = new SearchService(
                $this->searchUserPointUc,
                $this->airspaceService,
                $this->notamService,
                $this->airportService,
                $this->reportingPointService,
                $this->navaidService,
                $this->geonameService,
            );
        }

        return $this->searchService;
    }
}
