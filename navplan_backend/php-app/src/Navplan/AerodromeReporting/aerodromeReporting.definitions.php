<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the AerodromeReporting module.
 * Replaces the former ProdAerodromeReportingDiContainer.
 */

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Persistence\Query\DbAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use function DI\autowire;

return [
    IAerodromeReportingByExtentQuery::class => autowire(DbAerodromeReportingByExtentQuery::class),
    IAerodromeReportingByPositionQuery::class => autowire(DbAerodromeReportingByPositionQuery::class),
    IAerodromeReportingByTextQuery::class => autowire(DbAerodromeReportingByTextQuery::class),
    IAerodromeReportingByIcaoQuery::class => autowire(DbAerodromeReportingByIcaoQuery::class),

    // Bound to the CONCRETE class, not IRestController (see webcam.definitions.php).
    AdReportingPointController::class => autowire(),
];

