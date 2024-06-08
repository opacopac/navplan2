<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\Domain\Service\SearchService;
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
