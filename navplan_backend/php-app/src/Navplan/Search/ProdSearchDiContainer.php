<?php declare(strict_types=1);

namespace Navplan\Search;

use DI\Container;
use DI\ContainerBuilder;
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
use function DI\autowire;


class ProdSearchDiContainer implements ISearchDiContainer
{
    private Container $container;


    public function __construct(
        IHttpService                       $httpService,
        ISearchUserPointUc                 $searchUserPointUc,
        IAirspaceService                   $airspaceService,
        INotamSearchByPositionQuery        $notamSearchByPositionQuery,
        IAirportService                    $airportService,
        IAerodromeReportingByPositionQuery $aerodromeReportingByPositionQuery,
        IAerodromeReportingByTextQuery     $aerodromeReportingByTextQuery,
        INavaidService                     $navaidService,
        IGeonameService                    $geonameService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IHttpService::class => $httpService,
            ISearchUserPointUc::class => $searchUserPointUc,
            IAirspaceService::class => $airspaceService,
            INotamSearchByPositionQuery::class => $notamSearchByPositionQuery,
            IAirportService::class => $airportService,
            IAerodromeReportingByPositionQuery::class => $aerodromeReportingByPositionQuery,
            IAerodromeReportingByTextQuery::class => $aerodromeReportingByTextQuery,
            INavaidService::class => $navaidService,
            IGeonameService::class => $geonameService,

            // interface -> implementation bindings
            ISearchService::class => autowire(SearchService::class),
            IRestController::class => autowire(SearchController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getSearchController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    function getSearchService(): ISearchService
    {
        return $this->container->get(ISearchService::class);
    }
}
