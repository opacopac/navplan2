<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\Domain\Geoname;
use Navplan\Terrain\UseCase\ITerrainRepo;


class SearchGeoname {
    /* @var $geonameRepo IGeonameRepo */
    private $geonameRepo;
    /* @var $terrainRepo ITerrainRepo */
    private $terrainRepo;


    public function __construct(IGeonameConfig $config) {
        $this->geonameRepo = $config->getGeonameRepo();
        $this->terrainRepo = $config->getTerrainRepo();
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $geonameList = $this->geonameRepo->searchByPosition($position, $maxRadius_deg, $maxResults);
        $this->addMissingAltitudes($geonameList);

        return $geonameList;
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $geonameList = $this->geonameRepo->searchByText($searchText, $maxResults);
        $this->addMissingAltitudes($geonameList);

        return $geonameList;
    }


    private function addMissingAltitudes(array &$geonameList) {
        $noAltGeonameList = array_filter(
            $geonameList,
            function (Geoname $geoname) { return $geoname->elevation->value === 0.0; }
        );
        $noAltPosList = array_map(
            function (Geoname $geoname) { return $geoname->position; },
            $noAltGeonameList
        );
        $pos3dList = $this->terrainRepo->readElevation($noAltPosList);

        for ($i = 0; $i < count($noAltGeonameList); $i++) {
            $noAltGeonameList[$i]->elevation = $pos3dList[$i]->altitude;
        }
    }
}
