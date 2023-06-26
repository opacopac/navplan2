<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Enroute\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Enroute\Domain\Command\INavaidInsertAllCommand;
use Navplan\Enroute\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByTextQuery;


class NavaidService implements INavaidService {
    public function __construct(
        private INavaidSearchByExtentQuery $searchByExtentQuery,
        private INavaidSearchByPositionQuery $searchByPositionQuery,
        private INavaidSearchByTextQuery $searchByTextQuery,
        private INavaidInsertAllCommand $insertAllCommand,
        private INavaidDeleteAllCommand $deleteAllCommand
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        return $this->searchByExtentQuery->searchByExtent($extent, $zoom);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->searchByPositionQuery->searchByPosition($position, $maxRadius_deg, $maxResults);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->searchByTextQuery->searchByText($searchText, $maxResults);
    }


    public function insertAll(array $navaids): void {
        $this->insertAllCommand->insertAll($navaids);
    }


    public function deleteAll(): bool {
        return $this->deleteAllCommand->deleteAll();
    }
}
