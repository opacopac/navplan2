<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Airspace module.
 * Replaces the former ProdAirspaceDiContainer.
 */

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
use function DI\autowire;

return [
    IAirspaceSearchByExtentQuery::class => autowire(DbAirspaceSearchByExtentQuery::class),
    IAirspaceSearchByPositionQuery::class => autowire(DbAirspaceSearchByPositionQuery::class),
    IAirspaceSearchByRouteQuery::class => autowire(DbAirspaceSearchByRouteQuery::class),
    IAirspaceInsertAllCommand::class => autowire(DbAirspaceInsertAllCommand::class),
    IAirspaceDeleteAllCommand::class => autowire(DbAirspaceDeleteAllCommand::class),
    IFirReadByIcaoQuery::class => autowire(DbFirReadByIcaoQuery::class),
    IFirReadByIcaosQuery::class => autowire(DbFirReadByIcaosQuery::class),
    IAirspaceService::class => autowire(AirspaceService::class),
    IFirService::class => autowire(FirService::class),
    // Already bound to concrete classes before migration - no change needed.
    AirspaceController::class => autowire(),
    FirController::class => autowire(),
];
