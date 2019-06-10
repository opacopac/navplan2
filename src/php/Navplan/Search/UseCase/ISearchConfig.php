<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use Navplan\User\UseCase\TokenService;


interface ISearchConfig extends IOpenAipConfig, IGeonameConfig, IUserConfig, INotamConfig {
    function getOpenAipRepoFactory(): IOpenAipRepoFactory;

    function getGeonameRepo(): IGeonameRepo;

    function getSystemServiceFactory(): ISystemServiceFactory;

    function getUserRepoFactory(): IUserRepoFactory;

    function getTokenService(): TokenService;

    function getNotamRepo(): INotamRepo;

    function getTerrainRepo(): ITerrainRepo;
}
