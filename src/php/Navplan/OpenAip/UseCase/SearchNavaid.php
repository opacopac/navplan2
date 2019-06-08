<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class SearchNavaid {
    private $navaidRepo;


    public function __construct(IOpenAipConfig $config) {
        $this->navaidRepo = $config->getOpenAipRepoFactory()->createNavaidRepo();
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
