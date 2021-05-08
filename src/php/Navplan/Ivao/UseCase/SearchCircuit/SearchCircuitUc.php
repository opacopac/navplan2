<?php declare(strict_types=1);

namespace Navplan\Ivao\UseCase\SearchCircuit;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Ivao\DomainService\ICircuitRepo;


class SearchCircuitUc implements ISearchCircuitUc {
    public function __construct(private ICircuitRepo $circuitRepo) {
    }


    public function searchByExtent(Extent $extent): array {
        return $this->circuitRepo->getCircuitsByExtent($extent);
    }
}
