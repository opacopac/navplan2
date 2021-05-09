<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DomainService;

use Navplan\Common\DomainModel\Extent2d;


interface IMeteoRepo {
    function readSmaMeasurements(Extent2d $extent): array;

    function replaceSmaStations(array $smaStationList): void;
}
