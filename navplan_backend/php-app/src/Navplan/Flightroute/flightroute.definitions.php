<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Flightroute module.
 * Replaces the former ProdFlightrouteDiContainer.
 * IUserService, IDbService, IHttpService are already provided by other
 * (migrated) modules' definitions files / self-registration.
 */

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
use function DI\autowire;

return [
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

    // Bound to the CONCRETE class, not to the shared IRestController interface,
    // to avoid collisions with other modules' controller bindings.
    FlightrouteController::class => autowire(),
];

