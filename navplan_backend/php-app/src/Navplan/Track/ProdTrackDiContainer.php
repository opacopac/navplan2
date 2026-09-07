<?php declare(strict_types=1);

namespace Navplan\Track;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
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
use Navplan\User\Domain\Service\IUserService;
use function DI\autowire;


class ProdTrackDiContainer implements ITrackDiContainer
{
    private Container $container;


    public function __construct(
        IDbService     $dbService,
        IHttpService   $httpService,
        IUserService   $userService,
        IExportService $exportService,
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IDbService::class => $dbService,
            IHttpService::class => $httpService,
            IUserService::class => $userService,
            IExportService::class => $exportService,

            // interface -> implementation bindings
            ITrackListQuery::class => autowire(DbTrackListQuery::class),
            ITrackByIdQuery::class => autowire(DbTrackByIdQuery::class),
            ITrackCreateCommand::class => autowire(DbTrackCreateCommand::class),
            ITrackUpdateCommand::class => autowire(DbTrackUpdateCommand::class),
            ITrackDeleteCommand::class => autowire(DbTrackDeleteCommand::class),
            ITrackService::class => autowire(TrackService::class),
            IRestController::class => autowire(TrackController::class),
        ]);

        $this->container = $builder->build();
    }


    function getTrackController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    function getTrackService(): ITrackService
    {
        return $this->container->get(ITrackService::class);
    }
}
