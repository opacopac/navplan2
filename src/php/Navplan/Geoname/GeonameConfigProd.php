<?php declare(strict_types=1);

namespace Navplan\Geoname;

use Navplan\Db\DbConfigProd;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\System\SystemConfigProd;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\UseCase\ITerrainRepo;


class GeonameConfigProd implements IGeonameConfig {
    private $geonameRepo;
    private $terrainRepo;


    public function __construct() {
        $dbConfig = new DbConfigProd();
        $systemConfig = new SystemConfigProd();
        $this->geonameRepo = new DbGeonameRepo($dbConfig->getDbService());
        $this->terrainRepo = new FileTerrainRepo($systemConfig->getFileService());
    }


    public function getGeonameRepo(): IGeonameRepo {
        return $this->geonameRepo;
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }
}
