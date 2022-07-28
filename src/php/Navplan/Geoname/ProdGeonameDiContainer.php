<?php declare(strict_types=1);

namespace Navplan\Geoname;

use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\DomainService\GeonameService;
use Navplan\Geoname\DomainService\IGeonameService;
use Navplan\System\DomainService\IDbService;
use Navplan\Terrain\DomainService\ITerrainService;


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
