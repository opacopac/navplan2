<?php declare(strict_types=1);

namespace Navplan\Db;

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Search\UseCase\IDb;
use Navplan\Shared\IDbService;
use Navplan\Shared\MySqlDbService;


class DbConfigProd implements IDb {
    private $dbService;


    public function __construct() {
        $this->dbService = self::getAndInitDbService();
    }


    private static function getAndInitDbService(): IDbService {
        global $db_host, $db_user, $db_pw, $db_name;

        $dbService = MySqlDbService::getInstance();
        $dbService->init($db_host, $db_user, $db_pw, $db_name);

        return $dbService;
    }


    public function getDbService(): IDbService {
        return $this->dbService;
    }
}
