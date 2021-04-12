<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchAirport;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainService\IAirportRepo;


class SearchAirportUc implements ISearchAirportUc {
    public function __construct(private IAirportRepo $airportRepo) {
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
