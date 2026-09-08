<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Notam module.
 * Replaces the former ProdNotamDiContainer.
 */

use Navplan\Notam\Domain\Command\INotamGeometryDeleteAllCommand;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;
use Navplan\Notam\Domain\Query\IReadNotamChunkQuery;
use Navplan\Notam\Domain\Query\IReadNotamsByKeyQuery;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Domain\Service\NotamService;
use Navplan\Notam\IcaoImporter\INotamAirspaceParser;
use Navplan\Notam\IcaoImporter\INotamGeometryParser;
use Navplan\Notam\IcaoImporter\NotamAirspaceParser;
use Navplan\Notam\IcaoImporter\NotamGeometryParser;
use Navplan\Notam\Persistence\Command\DbNotamGeometryDeleteAllCommand;
use Navplan\Notam\Persistence\Query\DbNotamSearchByExtentQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByIcaoQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByPositionQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByRouteQuery;
use Navplan\Notam\Persistence\Query\DbReadNotamChunkQuery;
use Navplan\Notam\Persistence\Query\DbReadNotamsByKeyQuery;
use Navplan\Notam\Rest\Service\NotamController;
use function DI\autowire;

return [
    // INotamSearchByExtentQuery/IcaoQuery/RouteQuery have no external facade
    // getter (only used internally by NotamService), but the bindings are
    // still needed for autowiring.
    INotamSearchByExtentQuery::class => autowire(DbNotamSearchByExtentQuery::class),
    INotamSearchByIcaoQuery::class => autowire(DbNotamSearchByIcaoQuery::class),
    INotamSearchByPositionQuery::class => autowire(DbNotamSearchByPositionQuery::class),
    INotamSearchByRouteQuery::class => autowire(DbNotamSearchByRouteQuery::class),

    // IReadNotamsByKeyQuery/IReadNotamChunkQuery/INotamGeometryDeleteAllCommand/
    // INotamAirspaceParser have no external facade getter (only used internally
    // by NotamGeometryParser), but the bindings are still needed for autowiring.
    IReadNotamsByKeyQuery::class => autowire(DbReadNotamsByKeyQuery::class),
    IReadNotamChunkQuery::class => autowire(DbReadNotamChunkQuery::class),
    INotamGeometryDeleteAllCommand::class => autowire(DbNotamGeometryDeleteAllCommand::class),
    INotamAirspaceParser::class => autowire(NotamAirspaceParser::class),

    // NotamCoordinateParser/NotamAltitudeParser/NotamCircleGeometryParser/
    // NotamPolygonGeometryParser are consumed by NotamGeometryParser via their
    // CONCRETE class (not via interface), so no explicit binding is needed -
    // PHP-DI autowires them directly.

    INotamGeometryParser::class => autowire(NotamGeometryParser::class),
    INotamService::class => autowire(NotamService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    NotamController::class => autowire(),
];

