<?php declare(strict_types=1);

namespace Navplan\Airspace;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Airspace\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Airspace\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Airspace\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Airspace\Domain\Query\IFirReadByIcaosQuery;
use Navplan\Airspace\Domain\Service\AirspaceService;
use Navplan\Airspace\Domain\Service\FirService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Airspace\Persistence\Command\DbAirspaceDeleteAllCommand;
use Navplan\Airspace\Persistence\Command\DbAirspaceInsertAllCommand;
use Navplan\Airspace\Persistence\Query\DbAirspaceSearchByExtentQuery;
use Navplan\Airspace\Persistence\Query\DbAirspaceSearchByPositionQuery;
use Navplan\Airspace\Persistence\Query\DbAirspaceSearchByRouteQuery;
use Navplan\Airspace\Persistence\Query\DbFirReadByIcaoQuery;
use Navplan\Airspace\Persistence\Query\DbFirReadByIcaosQuery;
use Navplan\Airspace\Rest\Controller\AirspaceController;
use Navplan\Airspace\Rest\Controller\FirController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
use function DI\autowire;


class ProdAirspaceDiContainer implements IAirspaceDiContainer
{
    private Container $container;


    public function __construct(
        ILoggingService $loggingService,
        IDbService $dbService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            ILoggingService::class => $loggingService,
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            IAirspaceSearchByExtentQuery::class => autowire(DbAirspaceSearchByExtentQuery::class),
            IAirspaceSearchByPositionQuery::class => autowire(DbAirspaceSearchByPositionQuery::class),
            IAirspaceSearchByRouteQuery::class => autowire(DbAirspaceSearchByRouteQuery::class),
            IAirspaceInsertAllCommand::class => autowire(DbAirspaceInsertAllCommand::class),
            IAirspaceDeleteAllCommand::class => autowire(DbAirspaceDeleteAllCommand::class),
            IFirReadByIcaoQuery::class => autowire(DbFirReadByIcaoQuery::class),
            IFirReadByIcaosQuery::class => autowire(DbFirReadByIcaosQuery::class),
            IAirspaceService::class => autowire(AirspaceService::class),
            IFirService::class => autowire(FirService::class),
            AirspaceController::class => autowire(AirspaceController::class),
            FirController::class => autowire(FirController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getAirspaceController(): IRestController
    {
        return $this->container->get(AirspaceController::class);
    }


    public function getFirController(): IRestController
    {
        return $this->container->get(FirController::class);
    }


    public function getFirService(): IFirService
    {
        return $this->container->get(IFirService::class);
    }


    public function getAirspaceService(): IAirspaceService
    {
        return $this->container->get(IAirspaceService::class);
    }


    public function getAirspaceSearchByExtentQuery(): IAirspaceSearchByExtentQuery
    {
        return $this->container->get(IAirspaceSearchByExtentQuery::class);
    }


    public function getAirspaceSearchByPositionQuery(): IAirspaceSearchByPositionQuery
    {
        return $this->container->get(IAirspaceSearchByPositionQuery::class);
    }


    public function getAirspaceSearchByRouteQuery(): IAirspaceSearchByRouteQuery
    {
        return $this->container->get(IAirspaceSearchByRouteQuery::class);
    }


    public function getAirspaceInsertAllCommand(): IAirspaceInsertAllCommand
    {
        return $this->container->get(IAirspaceInsertAllCommand::class);
    }


    public function getAirspaceDeleteAllCommand(): IAirspaceDeleteAllCommand
    {
        return $this->container->get(IAirspaceDeleteAllCommand::class);
    }


    public function getFirReadByIcaoQuery(): IFirReadByIcaoQuery
    {
        return $this->container->get(IFirReadByIcaoQuery::class);
    }


    public function getFirReadByIcaosQuery(): IFirReadByIcaosQuery
    {
        return $this->container->get(IFirReadByIcaosQuery::class);
    }
}

