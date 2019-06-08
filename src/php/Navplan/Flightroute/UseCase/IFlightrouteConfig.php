<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\System\IMailService;
use Navplan\System\IFileService;
use Navplan\System\IHttpService;
use Navplan\System\ISystemConfig;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


interface IFlightrouteConfig extends ISystemConfig, IUserConfig {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getFileService(): IFileService;

    function getFlightrouteRepo(): IFlightrouteRepo;

    function getUserRepoFactory(): IUserRepoFactory;
}
