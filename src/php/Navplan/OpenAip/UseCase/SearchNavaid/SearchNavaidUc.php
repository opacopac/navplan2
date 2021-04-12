<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchNavaid;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainService\INavaidRepo;


class SearchNavaidUc implements ISearchNavaidUc {
    public function __construct(private INavaidRepo $navaidRepo) {
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->navaidRepo->searchByExtent($extent, $zoom);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->navaidRepo->searchByPosition($position, $maxRadius_deg, $maxResults);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->navaidRepo->searchByText($searchText, $maxResults);
    }
}
