<?php declare(strict_types=1);

namespace Navplan\Notam;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Notam\Domain\Command\INotamGeometryDeleteAllCommand;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;
use Navplan\Notam\Domain\Query\IReadNotamChunkQuery;
use Navplan\Notam\Domain\Query\IReadNotamsByKeyQuery;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Domain\Service\NotamService;
use Navplan\Notam\IcaoImporter\INotamAirspaceParser;
use Navplan\Notam\IcaoImporter\INotamAltitudeParser;
use Navplan\Notam\IcaoImporter\INotamCircleGeometryParser;
use Navplan\Notam\IcaoImporter\INotamCoordinateParser;
use Navplan\Notam\IcaoImporter\INotamGeometryParser;
use Navplan\Notam\IcaoImporter\INotamPolygonGeometryParser;
use Navplan\Notam\IcaoImporter\NotamAirspaceParser;
use Navplan\Notam\IcaoImporter\NotamAltitudeParser;
use Navplan\Notam\IcaoImporter\NotamCircleGeometryParser;
use Navplan\Notam\IcaoImporter\NotamCoordinateParser;
use Navplan\Notam\IcaoImporter\NotamGeometryParser;
use Navplan\Notam\IcaoImporter\NotamPolygonGeometryParser;
use Navplan\Notam\Persistence\Command\DbNotamGeometryDeleteAllCommand;
use Navplan\Notam\Persistence\Query\DbNotamSearchByExtentQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByIcaoQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByPositionQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByRouteQuery;
use Navplan\Notam\Persistence\Query\DbReadNotamChunkQuery;
use Navplan\Notam\Persistence\Query\DbReadNotamsByKeyQuery;
use Navplan\Notam\Rest\Service\NotamController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
use function DI\autowire;


class ProdNotamDiContainer implements INotamDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        IHttpService $httpService,
        ILoggingService $loggingService,
        IFirService $firService,
        IAirportService $airportService,
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IDbService::class => $dbService,
            IHttpService::class => $httpService,
            ILoggingService::class => $loggingService,
            IFirService::class => $firService,
            IAirportService::class => $airportService,

            // interface -> implementation bindings
            INotamConfig::class => autowire(ProdConfigDiContainer::class),
            INotamSearchByExtentQuery::class => autowire(DbNotamSearchByExtentQuery::class),
            INotamSearchByPositionQuery::class => autowire(DbNotamSearchByPositionQuery::class),
            INotamSearchByIcaoQuery::class => autowire(DbNotamSearchByIcaoQuery::class),
            INotamSearchByRouteQuery::class => autowire(DbNotamSearchByRouteQuery::class),
            IReadNotamsByKeyQuery::class => autowire(DbReadNotamsByKeyQuery::class),
            IReadNotamChunkQuery::class => autowire(DbReadNotamChunkQuery::class),
            INotamGeometryDeleteAllCommand::class => autowire(DbNotamGeometryDeleteAllCommand::class),
            INotamCoordinateParser::class => autowire(NotamCoordinateParser::class),
            INotamAltitudeParser::class => autowire(NotamAltitudeParser::class),
            INotamCircleGeometryParser::class => autowire(NotamCircleGeometryParser::class),
            INotamPolygonGeometryParser::class => autowire(NotamPolygonGeometryParser::class),
            INotamAirspaceParser::class => autowire(NotamAirspaceParser::class),
            INotamGeometryParser::class => autowire(NotamGeometryParser::class),
            INotamService::class => autowire(NotamService::class),
            IRestController::class => autowire(NotamController::class),
        ]);

        $this->container = $builder->build();
    }


    function getNotamConfig(): INotamConfig
    {
        return $this->container->get(INotamConfig::class);
    }


    function getNotamController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    function getNotamService(): INotamService
    {
        return $this->container->get(INotamService::class);
    }


    public function getNotamSearchByExtentQuery(): INotamSearchByExtentQuery
    {
        return $this->container->get(INotamSearchByExtentQuery::class);
    }


    public function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery
    {
        return $this->container->get(INotamSearchByPositionQuery::class);
    }


    public function getNotamSearchByIcaoQuery(): INotamSearchByIcaoQuery
    {
        return $this->container->get(INotamSearchByIcaoQuery::class);
    }


    public function getNotamSearchByRouteQuery(): INotamSearchByRouteQuery
    {
        return $this->container->get(INotamSearchByRouteQuery::class);
    }


    public function getReadNotamsByKeyQuery(): IReadNotamsByKeyQuery
    {
        return $this->container->get(IReadNotamsByKeyQuery::class);
    }


    public function getReadNotamChunkQuery(): IReadNotamChunkQuery
    {
        return $this->container->get(IReadNotamChunkQuery::class);
    }


    public function getNotamGeometryDeleteAllCommand(): INotamGeometryDeleteAllCommand
    {
        return $this->container->get(INotamGeometryDeleteAllCommand::class);
    }


    public function getNotamCoordinateParser(): INotamCoordinateParser
    {
        return $this->container->get(INotamCoordinateParser::class);
    }


    public function getNotamAltitudeParser(): INotamAltitudeParser
    {
        return $this->container->get(INotamAltitudeParser::class);
    }


    public function getNotamCircleGeometryParser(): INotamCircleGeometryParser
    {
        return $this->container->get(INotamCircleGeometryParser::class);
    }


    public function getNotamPolygonGeometryParser(): INotamPolygonGeometryParser
    {
        return $this->container->get(INotamPolygonGeometryParser::class);
    }


    public function getNotamAirspaceParser(): INotamAirspaceParser
    {
        return $this->container->get(INotamAirspaceParser::class);
    }


    public function getNotamGeometryParser(): INotamGeometryParser
    {
        return $this->container->get(INotamGeometryParser::class);
    }
}
