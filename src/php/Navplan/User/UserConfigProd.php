<?php declare(strict_types=1);

namespace Navplan\User;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\Db\IDb\IDbService;
use Navplan\System\IMailService;
use Navplan\System\IHttpResponseService;
use Navplan\System\SystemConfigProd;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


class UserConfigProd implements IUserConfig {
    private $dbConfig;
    private $systemConfig;
    private $userRepoFactory;


    public function __construct() {
        $this->dbConfig = new DbConfigProd();
        $this->systemConfig = new SystemConfigProd();
        $this->userRepoFactory = new DbUserRepoFactory($this->getDbService());
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


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
