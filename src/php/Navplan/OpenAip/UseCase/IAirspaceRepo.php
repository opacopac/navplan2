<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;


interface IAirspaceRepo {
    function searchByExtent(Extent $extent, int $zoom): array;
}