<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\MeteoSma\Domain\Model\SmaMeasurement;
use Navplan\MeteoSma\Domain\Model\SmaStation;


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
