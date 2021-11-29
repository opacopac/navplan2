<?php declare(strict_types=1);

namespace Navplan\Geoname\DomainService;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Geoname\DomainModel\Geoname;
use Navplan\Terrain\DomainService\ITerrainService;


class GeonameService implements IGeonameService {
    public function __construct(
        private IGeonameRepo $geonameRepo,
        private ITerrainService $terrainService
    ) {
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $geonames = $this->geonameRepo->searchByPosition($position, $maxRadius_deg, $maxResults);

        $this->setSearchResultNames($geonames, true);

        if (count($geonames) < $maxResults) {
            $geonames[] = Geoname::createFromPosition($position, Altitude::fromMtAmsl(0));
        }

        $this->setMissingAltitude($geonames);

        return $geonames;
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $geonames = $this->geonameRepo->searchByText($searchText, $maxResults);

        $this->setSearchResultNames($geonames, true);

        return $geonames;
    }


    private function setSearchResultNames(array &$geonames, bool $renameDuplicates): array {
        if ($renameDuplicates) {
            $duplicateIdx = self::findDuplicates($geonames);

            for ($i = 0; $i < count($geonames); $i++) {
                if (in_array($i, $duplicateIdx["admin1idx"]) && $geonames[$i]->admin2)
                    $geonames[$i]->searchresultname = $geonames[$i]->name . " (" . $geonames[$i]->country . ", " . $geonames[$i]->admin1 . ", " . $geonames[$i]->admin2 . ")";
                elseif (in_array($i, $duplicateIdx["nameidx"]) && $geonames[$i]->admin1)
                    $geonames[$i]->searchresultname = $geonames[$i]->name . " (" . $geonames[$i]->country . ", " . $geonames[$i]->admin1 . ")";
                else
                    $geonames[$i]->searchresultname = $geonames[$i]->name . " (" . $geonames[$i]->country . ")";
            }
        } else {
            for ($i = 0; $i < count($geonames); $i++) {
                $geonames[$i]->searchresultname = $geonames[$i]->name;
            }
        }

        return $geonames;
    }


    private function findDuplicates(array $geonames): array {
        $duplicateNameIdx = array();
        $duplicateAdmin1Idx = array();

        // check for duplicate names
        for ($i = 0; $i < count($geonames) - 1; $i++) {
            for ($j = $i + 1; $j < count($geonames); $j++) {
                if ($i == $j) {
                    continue;
                }

                if ($geonames[$i]->name == $geonames[$j]->name) {
                    if ($geonames[$i]->admin1 == $geonames[$j]->admin1) {
                        array_push($duplicateAdmin1Idx, $i);
                        array_push($duplicateAdmin1Idx, $j);
                    } else {
                        array_push($duplicateNameIdx, $i);
                        array_push($duplicateNameIdx, $j);
                    }
                }
            }
        }

        return array("nameidx" => $duplicateNameIdx, "admin1idx" => $duplicateAdmin1Idx);
    }


    private function setMissingAltitude(array &$geonames) {
        $zeroAltGeonames = [];
        $posList = [];

        foreach ($geonames as &$geoname) {
            if ($geoname->elevation->value == 0) {
                $zeroAltGeonames[] = $geoname;
                $posList[] = $geoname->position;
            }
        }

        if (count($zeroAltGeonames) > 0) {
            $pos3dList = $this->terrainService->readElevations($posList);

            for ($i = 0; $i < count($pos3dList); $i++) {
                $zeroAltGeonames[$i]->elevation = $pos3dList[$i]->altitude;
            }
        }
    }
}
