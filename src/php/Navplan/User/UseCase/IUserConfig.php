<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\Db\IDb\IDbService;
use Navplan\System\IHttpService;
use Navplan\System\IMailService;


interface IUserConfig {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getUserRepoFactory(): IUserRepoFactory;
}
