<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class SearchAirport {
    private $airportRepo;


    public function __construct(IOpenAipConfig $config) {
        $this->airportRepo = $config->getOpenAipRepoFactory()->createAirportRepo();
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->airportRepo->searchByExtent($extent, $zoom);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->airportRepo->searchByPosition($position, $maxRadius_deg, $maxResults);

    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->airportRepo->searchByText($searchText, $maxResults);
    }


    public function searchByIcao(array $icaoList): array {
        return $this->airportRepo->searchByIcao($icaoList);
    }
}
