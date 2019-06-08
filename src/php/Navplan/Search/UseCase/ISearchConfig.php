<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\UseCase\IHttpService;
use Navplan\System\UseCase\IMailService;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


interface ISearchConfig extends IOpenAipConfig, IGeonameConfig, IUserConfig, INotamConfig {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getOpenAipRepoFactory(): IOpenAipRepoFactory;

    function getUserRepoFactory(): IUserRepoFactory;

    function getNotamRepo(): INotamRepo;

    function getGeonameRepo(): IGeonameRepo;

    function getTerrainRepo(): ITerrainRepo;
}
