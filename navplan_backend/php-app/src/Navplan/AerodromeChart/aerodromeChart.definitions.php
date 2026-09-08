<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the AerodromeChart module.
 * Replaces the former ProdAerodromeChartDiContainer.
 *
 * IAerodromeChartConfig is aliased to IConfigDiContainer in config.definitions.php.
 * IUserService is provided via a bridge definition in ProdNavplanDiContainer
 * (the User module isn't migrated to this pattern yet).
 */

use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Command\IAirportChartDeleteCommand;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\AerodromeChart\Domain\Service\AirportChartService;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Domain\Service\ISwissGridChartTransformerService;
use Navplan\AerodromeChart\Domain\Service\SwissGridChartTransformerService;
use Navplan\AerodromeChart\Persistence\Command\DbAirportChartCreateCommand;
use Navplan\AerodromeChart\Persistence\Command\DbAirportChartDeleteCommand;
use Navplan\AerodromeChart\Persistence\Query\DbAirportChartByAirportQuery;
use Navplan\AerodromeChart\Persistence\Query\DbAirportChartByIdQuery;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use function DI\autowire;

return [
    IAirportChartByIdQuery::class => autowire(DbAirportChartByIdQuery::class),
    IAirportChartByAirportQuery::class => autowire(DbAirportChartByAirportQuery::class),
    IAirportChartCreateCommand::class => autowire(DbAirportChartCreateCommand::class),
    IAirportChartDeleteCommand::class => autowire(DbAirportChartDeleteCommand::class),
    ISwissGridChartTransformerService::class => autowire(SwissGridChartTransformerService::class),
    IAirportChartService::class => autowire(AirportChartService::class),

    // Bound to the CONCRETE class, not IRestController (see webcam.definitions.php).
    AdChartController::class => autowire(),
];

