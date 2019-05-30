<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Notam\UseCase\INotamRepoFactory;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;
use Navplan\User\UseCase\IUserRepoFactory;

interface ISearchConfig {
    function getDbService(): IDbService;

    function getMailService(): IMailService;

    function getHttpResponseService(): IHttpResponseService;

    function getOpenAipRepoFactory(): IOpenAipRepoFactory;

    function getUserRepoFactory(): IUserRepoFactory;

    function getGeonameRepoFactory(): IGeonameRepoFactory;

    function getNotamRepoFactory(): INotamRepoFactory;
}
