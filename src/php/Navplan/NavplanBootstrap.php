<?php declare(strict_types=1);

namespace Navplan;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../Autoloader.php";

use Navplan\Db\MySqlDb\MySqlDbService;
use Navplan\System\Posix\FileService;
use Navplan\System\Posix\HttpService;
use Navplan\Db\UseCase\IDbService;
use Navplan\System\UseCase\IFileService;
use Navplan\System\UseCase\IHttpService;
use Navplan\System\UseCase\IMailService;
use Navplan\System\Posix\MailService;

// header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD


class NavplanBootstrap {
    public static function getFileService(): IFileService {
        return FileService::getInstance();
    }


    public static function getHttpService(): IHttpService {
        return HttpService::getInstance();
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
}
