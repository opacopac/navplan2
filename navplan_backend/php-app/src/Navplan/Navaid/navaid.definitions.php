<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Navaid module.
 * Replaces the former ProdNavaidDiContainer.
 */

use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Navaid\Domain\Service\NavaidService;
use Navplan\Navaid\Persistence\Command\DbNavaidDeleteAllCommand;
use Navplan\Navaid\Persistence\Command\DbNavaidInsertAllCommand;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByExtentQuery;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByPositionQuery;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByTextQuery;
use Navplan\Navaid\Rest\Controller\NavaidController;
use function DI\autowire;

return [
    INavaidSearchByExtentQuery::class => autowire(DbNavaidSearchByExtentQuery::class),
    INavaidSearchByPositionQuery::class => autowire(DbNavaidSearchByPositionQuery::class),
    INavaidSearchByTextQuery::class => autowire(DbNavaidSearchByTextQuery::class),
    INavaidInsertAllCommand::class => autowire(DbNavaidInsertAllCommand::class),
    INavaidDeleteAllCommand::class => autowire(DbNavaidDeleteAllCommand::class),
    INavaidService::class => autowire(NavaidService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    NavaidController::class => autowire(),
];

