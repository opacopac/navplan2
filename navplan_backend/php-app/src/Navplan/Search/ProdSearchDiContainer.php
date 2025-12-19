<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
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
        private readonly IHttpService                       $httpService,
        private readonly ISearchUserPointUc                 $searchUserPointUc,
        private readonly IAirspaceService                   $airspaceService,
        private readonly INotamSearchByPositionQuery        $notamSearchByPositionQuery,
        private readonly IAirportService                    $airportService,
        private readonly IAerodromeReportingByPositionQuery $aerodromeReportingByPositionQuery,
        private readonly IAerodromeReportingByTextQuery     $aerodromeReportingByTextQuery,
        private readonly INavaidService                     $navaidService,
        private readonly IGeonameService                    $geonameService
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

                $this->notamSearchByPositionQuery,
                $this->airportService,
                $this->aerodromeReportingByPositionQuery,
                $this->aerodromeReportingByTextQuery,
                $this->navaidService,
                $this->geonameService,
            );
        }

        return $this->searchService;
    }
}
