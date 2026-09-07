<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Aerodrome\Domain\Command\IAirportCreateAllCommand;
use Navplan\Aerodrome\Domain\Command\IAirportDeleteAllCommand;
use Navplan\Aerodrome\Domain\Query\IAirportByExtentQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaoQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaosQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIdQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByPositionQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByTextQuery;
use Navplan\Aerodrome\Domain\Query\IAirportFeatureQuery;
use Navplan\Aerodrome\Domain\Query\IAirportRadioQuery;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\Aerodrome\Domain\Service\AirportService;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Persistence\Command\DbAirportCreateAllCommand;
use Navplan\Aerodrome\Persistence\Command\DbAirportDeleteAllCommand;
use Navplan\Aerodrome\Persistence\Query\DbAirportByExtentQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByIcaoQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByIcaosQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByIdQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByPositionQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByTextQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportFeatureQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportRadioQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportRunwayQuery;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use function DI\autowire;


class ProdAerodromeDiContainer implements IAerodromeDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        ILoggingService $loggingService,
        IHttpService $httpService,
        IAirportChartService $airportChartService,
        IWebcamByIcaoQuery $webcamByIcaoQuery
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IDbService::class => $dbService,
            ILoggingService::class => $loggingService,
            IHttpService::class => $httpService,
            IAirportChartService::class => $airportChartService,
            IWebcamByIcaoQuery::class => $webcamByIcaoQuery,

            // interface -> implementation bindings (only mapping needed per class)
            IAirportByIdQuery::class => autowire(DbAirportByIdQuery::class),
            IAirportByIcaoQuery::class => autowire(DbAirportByIcaoQuery::class),
            IAirportByIcaosQuery::class => autowire(DbAirportByIcaosQuery::class),
            IAirportByExtentQuery::class => autowire(DbAirportByExtentQuery::class),
            IAirportByPositionQuery::class => autowire(DbAirportByPositionQuery::class),
            IAirportByTextQuery::class => autowire(DbAirportByTextQuery::class),
            IAirportRunwayQuery::class => autowire(DbAirportRunwayQuery::class),
            IAirportRadioQuery::class => autowire(DbAirportRadioQuery::class),
            IAirportFeatureQuery::class => autowire(DbAirportFeatureQuery::class),
            IAirportCreateAllCommand::class => autowire(DbAirportCreateAllCommand::class),
            IAirportDeleteAllCommand::class => autowire(DbAirportDeleteAllCommand::class),
            IAirportService::class => autowire(AirportService::class),
            IRestController::class => autowire(AirportController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getAirportController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getAirportService(): IAirportService
    {
        return $this->container->get(IAirportService::class);
    }
}
