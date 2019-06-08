<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\System\UseCase\IMailService;
use Navplan\System\UseCase\IFileService;
use Navplan\System\UseCase\IHttpService;
use Navplan\System\UseCase\ISystemConfig;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


interface IFlightrouteConfig extends ISystemConfig, IUserConfig {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getFileService(): IFileService;

    function getFlightrouteRepo(): IFlightrouteRepo;

    function getUserRepoFactory(): IUserRepoFactory;
}
