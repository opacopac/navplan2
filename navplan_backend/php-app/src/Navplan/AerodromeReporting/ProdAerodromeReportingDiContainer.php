<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use function DI\autowire;


class ProdAerodromeReportingDiContainer implements IAerodromeReportingDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            IAerodromeReportingByExtentQuery::class => autowire(DbAerodromeReportingByExtentQuery::class),
            IAerodromeReportingByPositionQuery::class => autowire(DbAerodromeReportingByPositionQuery::class),
            IAerodromeReportingByTextQuery::class => autowire(DbAerodromeReportingByTextQuery::class),
            IAerodromeReportingByIcaoQuery::class => autowire(DbAerodromeReportingByIcaoQuery::class),
            IRestController::class => autowire(AdReportingPointController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getReportingPointController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getAerodromeReportingByExtentQuery(): IAerodromeReportingByExtentQuery
    {
        return $this->container->get(IAerodromeReportingByExtentQuery::class);
    }


    public function getAerodromeReportingByPositionQuery(): IAerodromeReportingByPositionQuery
    {
        return $this->container->get(IAerodromeReportingByPositionQuery::class);
    }


    public function getAerodromeReportingByTextQuery(): IAerodromeReportingByTextQuery
    {
        return $this->container->get(IAerodromeReportingByTextQuery::class);
    }


    public function getAerodromeReportingByIcaoQuery(): IAerodromeReportingByIcaoQuery
    {
        return $this->container->get(IAerodromeReportingByIcaoQuery::class);
    }
}

