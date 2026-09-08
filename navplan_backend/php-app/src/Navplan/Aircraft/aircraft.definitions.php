<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Aircraft module.
 * Replaces the former ProdAircraftDiContainer.
 *
 * IUserService is provided via a bridge definition in ProdNavplanDiContainer
 * (the User module isn't migrated to this pattern yet).
 */

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Domain\Query\IAircraftTypeDesignatorSearchQuery;
use Navplan\Aircraft\Domain\Service\AircraftService;
use Navplan\Aircraft\Domain\Service\AircraftTypeDesignatorService;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Domain\Service\IAircraftTypeDesignatorService;
use Navplan\Aircraft\Importer\Service\AircraftTypeDesignatorImporter;
use Navplan\Aircraft\Importer\Service\IAircraftTypeDesignatorImporter;
use Navplan\Aircraft\Persistence\Command\DbAircraftCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftUpdateCommand;
use Navplan\Aircraft\Persistence\Command\DbDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbWeightItemCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbWeightItemDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Persistence\Query\DbAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Query\DbAircraftListQuery;
use Navplan\Aircraft\Persistence\Query\DbAircraftTypeDesignatorSearchQuery;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Aircraft\Rest\Controller\AircraftTypeDesignatorController;
use function DI\autowire;

return [
    IAircraftListQuery::class => autowire(DbAircraftListQuery::class),
    IAircraftByIdQuery::class => autowire(DbAircraftByIdQuery::class),
    IWeightItemCreateCommand::class => autowire(DbWeightItemCreateCommand::class),
    IWeightItemDeleteCommand::class => autowire(DbWeightItemDeleteCommand::class),
    IWnbEnvelopeCreateCommand::class => autowire(DbWnbEnvelopeCreateCommand::class),
    IWnbEnvelopeDeleteCommand::class => autowire(DbWnbEnvelopeDeleteCommand::class),
    IDistancePerformanceTableCreateCommand::class => autowire(DbDistancePerformanceTableCreateCommand::class),
    IDistancePerformanceTableDeleteCommand::class => autowire(DbDistancePerformanceTableDeleteCommand::class),
    IAircraftCreateCommand::class => autowire(DbAircraftCreateCommand::class),
    IAircraftUpdateCommand::class => autowire(DbAircraftUpdateCommand::class),
    IAircraftDeleteCommand::class => autowire(DbAircraftDeleteCommand::class),
    IAircraftService::class => autowire(AircraftService::class),
    // Already bound to a concrete class before migration - no change needed.
    AircraftController::class => autowire(),

    IAircraftTypeDesignatorCreateCommand::class => autowire(DbAircraftTypeDesignatorCreateCommand::class),
    IAircraftTypeDesignatorDeleteAllCommand::class => autowire(DbAircraftTypeDesignatorDeleteAllCommand::class),
    IAircraftTypeDesignatorSearchQuery::class => autowire(DbAircraftTypeDesignatorSearchQuery::class),
    IAircraftTypeDesignatorService::class => autowire(AircraftTypeDesignatorService::class),
    AircraftTypeDesignatorController::class => autowire(),
    IAircraftTypeDesignatorImporter::class => autowire(AircraftTypeDesignatorImporter::class),
];

