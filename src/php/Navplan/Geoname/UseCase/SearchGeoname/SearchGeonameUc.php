<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase\SearchGeoname;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geoname\DomainModel\Geoname;
use Navplan\Geoname\DomainService\IGeonameRepo;
use Navplan\Terrain\DomainService\ITerrainRepo;


class SearchGeonameUc implements ISearchGeonameUc {
    public function __construct(
        private IGeonameRepo $geonameRepo,
        private ITerrainRepo $terrainRepo
    ) {
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
