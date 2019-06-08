<?php declare(strict_types=1);

namespace Navplan\Search;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Notam\DbRepo\DbNotamRepo;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\System\IMailService;
use Navplan\System\IHttpService;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\SystemConfigProd;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserRepoFactory;


class SearchConfigProd implements ISearchConfig {
    private $mailService;
    private $httpService;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepo;
    private $notamRepo;
    private $terrainRepo;


    public function __construct() {
        $dbConfig = new DbConfigProd();
        $systemConfig = new SystemConfigProd();
        $this->mailService = $systemConfig->getMailService();
        $this->httpService = $systemConfig->getHttpService();
        $this->openAipRepoFactory = new DbOpenAipRepoFactory($dbConfig->getDbService());
        $this->userRepoFactory = new DbUserRepoFactory($dbConfig->getDbService());
        $this->geonameRepo = new DbGeonameRepo($dbConfig->getDbService());
        $this->notamRepo = new DbNotamRepo($dbConfig->getDbService());
        $this->terrainRepo = new FileTerrainRepo($systemConfig->getFileService());
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }


    public function getOpenAipRepoFactory(): IOpenAipRepoFactory {
        return $this->openAipRepoFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }


    public function getGeonameRepo(): IGeonameRepo {
        return $this->geonameRepo;
    }


    public function getNotamRepo(): INotamRepo {
        return $this->notamRepo;
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }
}
