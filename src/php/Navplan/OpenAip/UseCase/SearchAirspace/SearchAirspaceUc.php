<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchAirspace;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\DomainService\IAirspaceRepo;


class SearchAirspaceUc implements ISearchAirspaceUc {
    public function __construct(private IAirspaceRepo $airspaceRepo) {
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->airspaceRepo->searchByExtent($extent, $zoom);
    }
}
