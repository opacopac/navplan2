<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\MeteoSma\DomainService\IMeteoRepo;


class MockMeteoRepo implements IMeteoRepo {
    public array $readSmaMeasurementsArgs;
    public array $readSmaMeasurementsResult;
    public array $replaceSmaStationsArgs;


    public function readSmaMeasurements(Extent2d $extent): array {
        $this->readSmaMeasurementsArgs = [$extent];

        return $this->readSmaMeasurementsResult;
    }


    public function replaceSmaStations(array $smaStationList): void {
        $this->replaceSmaStationsArgs = $smaStationList;
    }
}
