<?php declare(strict_types=1);

namespace Navplan\Navaid\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;


class NavaidService implements INavaidService {
    public function __construct(
        private readonly INavaidSearchByExtentQuery $searchByExtentQuery,
        private readonly INavaidSearchByPositionQuery $searchByPositionQuery,
        private readonly INavaidSearchByTextQuery $searchByTextQuery,
        private readonly INavaidInsertAllCommand $insertAllCommand,
        private readonly INavaidDeleteAllCommand $deleteAllCommand
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
