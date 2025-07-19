<?php declare(strict_types=1);

namespace Navplan\Geoname;

use Navplan\Geoname\Domain\Service\GeonameService;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Geoname\Persistence\Repo\DbGeonameRepo;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\Terrain\Domain\Service\ITerrainService;


class ProdGeonameDiContainer implements IGeonameDiContainer {
    private IGeonameService $geonameService;


    public function __construct(
        private IDbService $dbService,
        private ITerrainService $terrainService
    ) {
    }


    function getGeonameService(): IGeonameService {
        if (!isset($this->geonameService)) {
            $this->geonameService = new GeonameService(
                new DbGeonameRepo($this->dbService),
                $this->terrainService,
            );
        }

        return $this->geonameService;
    }
}
