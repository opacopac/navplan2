<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\System\UseCase\IHttpService;
use Navplan\System\UseCase\IMailService;


interface IUserConfig {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getUserRepoFactory(): IUserRepoFactory;
}
