<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DomainService;

use Navplan\Geometry\DomainModel\Extent;


interface IMeteoRepo {
    function readSmaMeasurements(Extent $extent): array;

    function replaceSmaStations(array $smaStationList): void;
}
