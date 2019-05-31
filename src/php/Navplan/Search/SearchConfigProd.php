<?php declare(strict_types=1);

namespace Navplan\Search;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\Geoname\DbRepo\DbGeonameRepoFactory;
use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Notam\DbRepo\DbNotamRepoFactory;
use Navplan\Notam\UseCase\INotamRepoFactory;
use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\Db\IDb\IDbService;
use Navplan\System\IMailService;
use Navplan\System\IHttpResponseService;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\SystemConfigProd;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserRepoFactory;


class SearchConfigProd implements ISearchConfig {
    private $dbConfig;
    private $systemConfig;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepoFactory;
    private $notamRepoFactory;


    public function __construct() {
        $this->dbConfig = new DbConfigProd();
        $this->systemConfig = new SystemConfigProd();
        $this->openAipRepoFactory = new DbOpenAipRepoFactory($this->getDbService());
        $this->userRepoFactory = new DbUserRepoFactory($this->getDbService());
        $this->geonameRepoFactory = new DbGeonameRepoFactory($this->getDbService());
        $this->notamRepoFactory = new DbNotamRepoFactory($this->getDbService());
    }


    public function getDbService(): IDbService {
        return $this->dbConfig->getDbService();
    }


    public function getMailService(): IMailService{
        return $this->systemConfig->getMailService();
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->systemConfig->getHttpResponseService();
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


    public function getNotamRepoFactory(): INotamRepoFactory {
        return $this->notamRepoFactory;
    }
}
