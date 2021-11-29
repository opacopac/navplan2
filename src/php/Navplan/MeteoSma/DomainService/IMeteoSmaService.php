<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\MeteoSma\DomainModel\SmaMeasurement;
use Navplan\MeteoSma\DomainModel\SmaStation;


interface IMeteoSmaService {
    /**
     * @param Extent2d $extent
     * @return SmaMeasurement[]
     */
    function readSmaMeasurements(Extent2d $extent): array;

    /**
     * @param SmaStation[] $smaStationList
     */
    function replaceSmaStations(array $smaStationList): void;
}
