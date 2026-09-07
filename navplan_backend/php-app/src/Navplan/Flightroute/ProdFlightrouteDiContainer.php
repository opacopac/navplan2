<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Domain\Command\IFlightrouteCreateCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteDeleteCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteUpdateCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsCreateCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Domain\Query\IFlightrouteByHashQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByShareIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Domain\Service\FlightrouteService;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;
use Navplan\Flightroute\Persistence\Command\DbFlightrouteCreateCommand;
use Navplan\Flightroute\Persistence\Command\DbFlightrouteDeleteCommand;
use Navplan\Flightroute\Persistence\Command\DbFlightrouteUpdateCommand;
use Navplan\Flightroute\Persistence\Command\DbWaypointsCreateCommand;
use Navplan\Flightroute\Persistence\Command\DbWaypointsDeleteCommand;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteByHashQuery;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteByIdQuery;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteByShareIdQuery;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteListQuery;
use Navplan\Flightroute\Persistence\Query\DbWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Domain\Service\IUserService;
use function DI\autowire;


class ProdFlightrouteDiContainer implements IFlightrouteDiContainer
{
    private Container $container;


    public function __construct(
        IUserService $userService,
        IDbService $dbService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IUserService::class => $userService,
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            IFlightrouteListQuery::class => autowire(DbFlightrouteListQuery::class),
            IFlightrouteByIdQuery::class => autowire(DbFlightrouteByIdQuery::class),
            IFlightrouteByShareIdQuery::class => autowire(DbFlightrouteByShareIdQuery::class),
            IFlightrouteByHashQuery::class => autowire(DbFlightrouteByHashQuery::class),
            IWaypointsByFlightrouteQuery::class => autowire(DbWaypointsByFlightrouteQuery::class),
            IWaypointsCreateCommand::class => autowire(DbWaypointsCreateCommand::class),
            IWaypointsDeleteCommand::class => autowire(DbWaypointsDeleteCommand::class),
            IFlightrouteCreateCommand::class => autowire(DbFlightrouteCreateCommand::class),
            IFlightrouteDeleteCommand::class => autowire(DbFlightrouteDeleteCommand::class),
            IFlightrouteUpdateCommand::class => autowire(DbFlightrouteUpdateCommand::class),
            IFlightrouteService::class => autowire(FlightrouteService::class),
            IRestController::class => autowire(FlightrouteController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getFlightrouteController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getFlightrouteService(): IFlightrouteService
    {
        return $this->container->get(IFlightrouteService::class);
    }


    public function getFlightrouteListQuery(): IFlightrouteListQuery
    {
        return $this->container->get(IFlightrouteListQuery::class);
    }


    public function getFlightrouteByIdQuery(): IFlightrouteByIdQuery
    {
        return $this->container->get(IFlightrouteByIdQuery::class);
    }


    public function getFlightrouteByShareIdQuery(): IFlightrouteByShareIdQuery
    {
        return $this->container->get(IFlightrouteByShareIdQuery::class);
    }


    public function getFlightrouteByHashQuery(): IFlightrouteByHashQuery
    {
        return $this->container->get(IFlightrouteByHashQuery::class);
    }


    public function getFlightrouteAddCommand(): IFlightrouteCreateCommand
    {
        return $this->container->get(IFlightrouteCreateCommand::class);
    }


    public function getFlightrouteDeleteCommand(): IFlightrouteDeleteCommand
    {
        return $this->container->get(IFlightrouteDeleteCommand::class);
    }


    public function getFlightrouteUpdateCommand(): IFlightrouteUpdateCommand
    {
        return $this->container->get(IFlightrouteUpdateCommand::class);
    }


    public function getWaypointsByFlightrouteQuery(): IWaypointsByFlightrouteQuery
    {
        return $this->container->get(IWaypointsByFlightrouteQuery::class);
    }


    public function getWaypointsAddCommand(): IWaypointsCreateCommand
    {
        return $this->container->get(IWaypointsCreateCommand::class);
    }


    public function getWaypointsDeleteCommand(): IWaypointsDeleteCommand
    {
        return $this->container->get(IWaypointsDeleteCommand::class);
    }
}
