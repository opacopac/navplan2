<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Aerodrome (Airport) module.
 * Replaces the former ProdAerodromeDiContainer.
 *
 * AirportService also depends on IAirportChartService (AerodromeChart module)
 * and IWebcamByIcaoQuery (Webcam module) - both already bound directly in the
 * merged container (via aerodromeChart.definitions.php / webcam.definitions.php),
 * so no cross-module DiContainer facade call is needed here anymore.
 */

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
use function DI\autowire;

return [
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

    // Bound to the CONCRETE class, not IRestController (see webcam.definitions.php
    // for why: every module has its own controller implementing IRestController).
    AirportController::class => autowire(),
];

