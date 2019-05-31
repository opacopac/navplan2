<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\Db\IDb\IDbService;
use Navplan\System\IHttpResponseService;
use Navplan\System\IMailService;


interface IUserConfig {
    function getDbService(): IDbService;

    function getMailService(): IMailService;

    function getHttpResponseService(): IHttpResponseService;

    function getUserRepoFactory(): IUserRepoFactory;
}
