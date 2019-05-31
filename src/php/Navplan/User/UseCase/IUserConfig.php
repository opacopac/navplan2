<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;


interface IUserConfig {
    function getDbService(): IDbService;

    function getMailService(): IMailService;

    function getHttpResponseService(): IHttpResponseService;

    function getUserRepoFactory(): IUserRepoFactory;
}
