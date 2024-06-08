<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Service;

use Navplan\Airspace\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Airspace\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;


class AirspaceService implements IAirspaceService {
    public function __construct(
        private IAirspaceSearchByExtentQuery $searchByExtentQuery,
        private IAirspaceSearchByRouteQuery $searchByRouteQuery,
        private IAirspaceSearchByPositionQuery $searchByPositionQuery,
        private IAirspaceInsertAllCommand $airspaceInsertAllCommand,
        private IAirspaceDeleteAllCommand $airspaceDeleteAllCommand
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        return $this->searchByExtentQuery->searchByExtent($extent, $zoom);
    }


    public function searchByRouteIntersection(array $lonLatList): array {
        return $this->searchByRouteQuery->searchByRouteIntersection($lonLatList);
    }


    public function searchByPosition(Position2d $position2d): array {
        return $this->searchByPositionQuery->searchByPosition($position2d);
    }


    public function insertAll(array $airspaces): void {
        $this->airspaceInsertAllCommand->insertAll($airspaces);
    }


    public function deleteAll(): bool {
        return $this->airspaceDeleteAllCommand->deleteAll();
    }
}
