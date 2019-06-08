<?php declare(strict_types=1);

namespace Navplan\User;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\System\IMailService;
use Navplan\System\IHttpResponseService;
use Navplan\System\SystemConfigProd;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


class UserConfigProd implements IUserConfig {
    private $mailService;
    private $httpResponseService;
    private $userRepoFactory;


    public function __construct() {
        $dbConfig = new DbConfigProd();
        $systemConfig = new SystemConfigProd();
        $this->mailService = $systemConfig->getMailService();
        $this->httpResponseService = $systemConfig->getHttpResponseService();
        $this->userRepoFactory = new DbUserRepoFactory($dbConfig->getDbService());
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->httpResponseService;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
