<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


interface IFlightrouteConfig extends ISystemConfig, IUserConfig {
    function getSystemServiceFactory(): ISystemServiceFactory;

    function getFlightrouteRepo(): IFlightrouteRepo;

    function getUserRepoFactory(): IUserRepoFactory;
}
