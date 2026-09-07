<?php declare(strict_types=1);

namespace Navplan\AerodromeChart;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Command\IAirportChartDeleteCommand;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\AerodromeChart\Domain\Service\AirportChartService;
use Navplan\AerodromeChart\Domain\Service\IAerodromeChartConfig;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Domain\Service\ISwissGridChartTransformerService;
use Navplan\AerodromeChart\Domain\Service\SwissGridChartTransformerService;
use Navplan\AerodromeChart\Persistence\Command\DbAirportChartCreateCommand;
use Navplan\AerodromeChart\Persistence\Command\DbAirportChartDeleteCommand;
use Navplan\AerodromeChart\Persistence\Query\DbAirportChartByAirportQuery;
use Navplan\AerodromeChart\Persistence\Query\DbAirportChartByIdQuery;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\User\Domain\Service\IUserService;
use function DI\autowire;


class ProdAerodromeChartDiContainer implements IAerodromeChartDiContainer
{
    private Container $container;


    public function __construct(
        IAerodromeChartConfig $aerodromeChartConfig,
        IDbService $dbService,
        IFileService $fileService,
        IImageService $imageService,
        IUserService $userService,
        IHttpService $httpService,
        IProcService $procService,
        ILoggingService $loggingService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IAerodromeChartConfig::class => $aerodromeChartConfig,
            IDbService::class => $dbService,
            IFileService::class => $fileService,
            IImageService::class => $imageService,
            IUserService::class => $userService,
            IHttpService::class => $httpService,
            IProcService::class => $procService,
            ILoggingService::class => $loggingService,

            // interface -> implementation bindings (only mapping needed per class)
            IAirportChartByIdQuery::class => autowire(DbAirportChartByIdQuery::class),
            IAirportChartByAirportQuery::class => autowire(DbAirportChartByAirportQuery::class),
            IAirportChartCreateCommand::class => autowire(DbAirportChartCreateCommand::class),
            IAirportChartDeleteCommand::class => autowire(DbAirportChartDeleteCommand::class),
            ISwissGridChartTransformerService::class => autowire(SwissGridChartTransformerService::class),
            IAirportChartService::class => autowire(AirportChartService::class),
            IRestController::class => autowire(AdChartController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getAirportChartController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getAirportChartService(): IAirportChartService
    {
        return $this->container->get(IAirportChartService::class);
    }
}
