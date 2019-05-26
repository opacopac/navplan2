<?php declare(strict_types=1);

namespace Navplan\Search\Config;

use Navplan\Geoname\IRepo\IGeonameRepoFactory;
use Navplan\NavplanBootstrap;
use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;
use Navplan\Shared\IHttpResponseService;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\User\IRepo\IUserRepoFactory;


class SearchConfigProd implements ISearchConfig {
    private $dbService;
    private $mailService;
    private $httpResponseService;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepoFactory;


    public function __construct() {
        $this->dbService = NavplanBootstrap::getAndInitDbService();
        $this->mailService = NavplanBootstrap::getMailService();
        $this->httpResponseService = NavplanBootstrap::getHttpResponseService();
        $this->openAipRepoFactory = NavplanBootstrap::getOpenAipDbRepoFactory($this->getDbService());
        $this->userRepoFactory = NavplanBootstrap::getUserDbRepoFactory($this->getDbService());
        $this->geonameRepoFactory = NavplanBootstrap::getGeonameDbRepoFactory($this->getDbService());
    }


    public function getDbService(): IDbService {
        return $this->dbService;
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->httpResponseService;
    }


    public function getOpenAipRepoFactory(): IOpenAipRepoFactory {
        return $this->openAipRepoFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }


    public function getGeonameRepoFactory(): IGeonameRepoFactory {
        return $this->geonameRepoFactory;
    }
}
