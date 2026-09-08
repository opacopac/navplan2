<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Track module.
 * Replaces the former ProdTrackDiContainer.
 */

use Navplan\Track\Domain\Command\ITrackCreateCommand;
use Navplan\Track\Domain\Command\ITrackDeleteCommand;
use Navplan\Track\Domain\Command\ITrackUpdateCommand;
use Navplan\Track\Domain\Query\ITrackByIdQuery;
use Navplan\Track\Domain\Query\ITrackListQuery;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Domain\Service\TrackService;
use Navplan\Track\Persistence\Command\DbTrackCreateCommand;
use Navplan\Track\Persistence\Command\DbTrackDeleteCommand;
use Navplan\Track\Persistence\Command\DbTrackUpdateCommand;
use Navplan\Track\Persistence\Query\DbTrackByIdQuery;
use Navplan\Track\Persistence\Query\DbTrackListQuery;
use Navplan\Track\Rest\Service\TrackController;
use function DI\autowire;

return [
    ITrackListQuery::class => autowire(DbTrackListQuery::class),
    ITrackByIdQuery::class => autowire(DbTrackByIdQuery::class),
    ITrackCreateCommand::class => autowire(DbTrackCreateCommand::class),
    ITrackUpdateCommand::class => autowire(DbTrackUpdateCommand::class),
    ITrackDeleteCommand::class => autowire(DbTrackDeleteCommand::class),
    ITrackService::class => autowire(TrackService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    TrackController::class => autowire(),
];
