<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Aerodrome\DomainService\IAirportService;
use Navplan\Aerodrome\DomainService\IReportingPointService;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\Geoname\DomainService\IGeonameService;
use Navplan\Notam\DomainService\INotamService;
use Navplan\Search\DomainService\ISearchService;
use Navplan\Search\DomainService\SearchService;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class ProdSearchDiContainer implements ISearchDiContainer {
    private ISearchService $searchService;


    public function __construct(
        private ISearchUserPointUc $searchUserPointUc,
        private IAirspaceService $airspaceService,
        private INotamService $notamService,
        private IAirportService $airportService,
        private IReportingPointService $reportingPointService,
        private INavaidService $navaidService,
        private IGeonameService $geonameService
    ) {
    }


    function getSearchService(): ISearchService {
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
