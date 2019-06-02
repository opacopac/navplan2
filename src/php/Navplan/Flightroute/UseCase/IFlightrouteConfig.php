<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\Db\IDb\IDbService;
use Navplan\System\IHttpResponseService;
use Navplan\User\UseCase\IUserRepoFactory;


interface IFlightrouteConfig {
    function getDbService(): IDbService;

    function getHttpResponseService(): IHttpResponseService;

    function getFlightrouteRepoFactory(): IFlightrouteRepoFactory;

    function getUserRepoFactory(): IUserRepoFactory;
}
