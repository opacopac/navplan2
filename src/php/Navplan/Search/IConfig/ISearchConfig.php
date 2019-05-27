<?php declare(strict_types=1);

namespace Navplan\Search\IConfig;

use Navplan\Geoname\IRepo\IGeonameRepoFactory;
use Navplan\Notam\IRepo\INotamRepoFactory;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;
use Navplan\User\IRepo\IUserRepoFactory;


interface ISearchConfig {
    function getDbService(): IDbService;

    function getMailService(): IMailService;

    function getHttpResponseService(): IHttpResponseService;

    function getOpenAipRepoFactory(): IOpenAipRepoFactory;

    function getUserRepoFactory(): IUserRepoFactory;

    function getGeonameRepoFactory(): IGeonameRepoFactory;

    function getNotamRepoFactory(): INotamRepoFactory;
}
