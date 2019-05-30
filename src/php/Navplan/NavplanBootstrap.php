<?php declare(strict_types=1);

namespace Navplan;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../Autoloader.php";

use Navplan\Geoname\DbRepo\DbGeonameRepoFactory;
use Navplan\Geoname\IRepo\IGeonameRepoFactory;
use Navplan\Notam\DbRepo\DbNotamRepoFactory;
use Navplan\Notam\IRepo\INotamRepoFactory;
use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\Shared\FileService;
use Navplan\Shared\HttpResponseService;
use Navplan\Shared\IDbService;
use Navplan\Shared\IFileService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;
use Navplan\Shared\MailService;
use Navplan\Shared\MySqlDbService;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\IRepo\IUserRepoFactory;

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
        return new DbOpenAipRepoFactory($dbService);
    }


    public static function getUserDbRepoFactory(IDbService $dbService): IUserRepoFactory {
        return new DbUserRepoFactory($dbService);
    }


    public static function getGeonameDbRepoFactory(IDbService $dbService): IGeonameRepoFactory {
        return new DbGeonameRepoFactory($dbService);
    }


    public static function getNotamDbRepoFactory(IDbService $dbService): INotamRepoFactory {
        return new DbNotamRepoFactory($dbService);
    }
}
