<?php declare(strict_types=1);

namespace Navplan;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../Autoloader.php";

use Navplan\OpenAip\DbRepo\OpenAipDbRepoFactory;
use Navplan\OpenAip\DbRepo\UserDbRepoFactory;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\Shared\FileService;
use Navplan\Shared\HttpResponseService;
use Navplan\Shared\IDbService;
use Navplan\Shared\IFileService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;
use Navplan\Shared\MailService;
use Navplan\Shared\MySqlDbService;
use Navplan\User\RepoGateway\IUserRepoFactory;

// header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD


class NavplanBootstrap {
    public static function getFileService(): IFileService {
        return FileService::getInstance();
    }


    public static function getHttpResponseService(): IHttpResponseService {
        return HttpResponseService::getInstance();
    }


    public static function getAndInitDbService(): IDbService {
        global $db_host, $db_user, $db_pw, $db_name;

        $dbService = MySqlDbService::getInstance();
        $dbService->init($db_host, $db_user, $db_pw, $db_name);

        return $dbService;
    }


    public static function getMailService(): IMailService {
        return MailService::getInstance();
    }


    public static function getOpenAipDbRepoFactory(IDbService $dbService): IOpenAipRepoFactory {
        return new OpenAipDbRepoFactory($dbService);
    }


    public static function getUserDbRepoFactory(IDbService $dbService): IUserRepoFactory {
        return new UserDbRepoFactory($dbService);
    }
}
