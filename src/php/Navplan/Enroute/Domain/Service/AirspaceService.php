<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Service;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Enroute\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByRouteQuery;


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
