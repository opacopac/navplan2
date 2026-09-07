<?php declare(strict_types=1);

namespace Navplan\Aircraft;

use DI\Container;
use DI\ContainerBuilder;
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
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\User\Domain\Service\IUserService;
use function DI\autowire;


class ProdAircraftDiContainer implements IAircraftDiContainer
{
    private Container $container;


    public function __construct(
        IUserService $userService,
        IDbService $dbService,
        IHttpService $httpService,
        ILoggingService $loggingService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IUserService::class => $userService,
            IDbService::class => $dbService,
            IHttpService::class => $httpService,
            ILoggingService::class => $loggingService,

            // interface -> implementation bindings (only mapping needed per class)
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
            AircraftController::class => autowire(AircraftController::class),
            IAircraftTypeDesignatorCreateCommand::class => autowire(DbAircraftTypeDesignatorCreateCommand::class),
            IAircraftTypeDesignatorDeleteAllCommand::class => autowire(DbAircraftTypeDesignatorDeleteAllCommand::class),
            IAircraftTypeDesignatorSearchQuery::class => autowire(DbAircraftTypeDesignatorSearchQuery::class),
            IAircraftTypeDesignatorService::class => autowire(AircraftTypeDesignatorService::class),
            AircraftTypeDesignatorController::class => autowire(AircraftTypeDesignatorController::class),
            IAircraftTypeDesignatorImporter::class => autowire(AircraftTypeDesignatorImporter::class),
        ]);

        $this->container = $builder->build();
    }


    public function getAircraftController(): IRestController
    {
        return $this->container->get(AircraftController::class);
    }


    public function getAircraftService(): IAircraftService
    {
        return $this->container->get(IAircraftService::class);
    }


    public function getAircraftListQuery(): IAircraftListQuery
    {
        return $this->container->get(IAircraftListQuery::class);
    }


    public function getAircraftByIdQuery(): IAircraftByIdQuery
    {
        return $this->container->get(IAircraftByIdQuery::class);
    }


    public function getAircraftCreateCommand(): IAircraftCreateCommand
    {
        return $this->container->get(IAircraftCreateCommand::class);
    }


    public function getAircraftUpdateCommand(): IAircraftUpdateCommand
    {
        return $this->container->get(IAircraftUpdateCommand::class);
    }


    public function getAircraftDeleteCommand(): IAircraftDeleteCommand
    {
        return $this->container->get(IAircraftDeleteCommand::class);
    }


    public function getDistancePerformanceTableCreateCommand(): IDistancePerformanceTableCreateCommand
    {
        return $this->container->get(IDistancePerformanceTableCreateCommand::class);
    }


    public function getDistancePerformanceTableDeleteCommand(): IDistancePerformanceTableDeleteCommand
    {
        return $this->container->get(IDistancePerformanceTableDeleteCommand::class);
    }


    public function getAircraftTypeDesignatorController(): IRestController
    {
        return $this->container->get(AircraftTypeDesignatorController::class);
    }


    public function getAircraftTypeDesignatorService(): IAircraftTypeDesignatorService
    {
        return $this->container->get(IAircraftTypeDesignatorService::class);
    }


    public function getAircraftTypeDesignatorCreateCommand(): IAircraftTypeDesignatorCreateCommand
    {
        return $this->container->get(IAircraftTypeDesignatorCreateCommand::class);
    }


    public function getAircraftTypeDesignatorDeleteAllCommand(): IAircraftTypeDesignatorDeleteAllCommand
    {
        return $this->container->get(IAircraftTypeDesignatorDeleteAllCommand::class);
    }


    public function getAircraftTypeDesignatorImporter(): IAircraftTypeDesignatorImporter
    {
        return $this->container->get(IAircraftTypeDesignatorImporter::class);
    }


    public function getAircraftTypeDesignatorSearchQuery(): IAircraftTypeDesignatorSearchQuery
    {
        return $this->container->get(IAircraftTypeDesignatorSearchQuery::class);
    }
}
