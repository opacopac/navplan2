<?php declare(strict_types=1);

namespace Navplan\Meteo\UseCase;

use Navplan\Geometry\Domain\Extent;


interface IMeteoRepo {
    function readSmaMeasurements(Extent $extent): array;
}
