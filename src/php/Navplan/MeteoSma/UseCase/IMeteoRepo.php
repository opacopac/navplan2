<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase;

use Navplan\Geometry\Domain\Extent;


interface IMeteoRepo {
    function readSmaMeasurements(Extent $extent): array;


    function replaceSmaStations(array $smaStationList): void;
}
