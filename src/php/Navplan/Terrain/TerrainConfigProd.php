<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\System\SystemConfigProd;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\UseCase\ITerrainConfig;
use Navplan\Terrain\UseCase\ITerrainRepo;

require_once __DIR__ . "/../../Autoloader.php";


class TerrainConfigProd implements ITerrainConfig {
    private $terrainRepo;


    public function __construct() {
        $systemConfig = new SystemConfigProd();
        $this->terrainRepo = new FileTerrainRepo($systemConfig->getFileService());
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }
}
