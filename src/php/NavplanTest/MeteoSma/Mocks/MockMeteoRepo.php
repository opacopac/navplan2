<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Geometry\Domain\Extent;
use Navplan\MeteoSma\UseCase\IMeteoRepo;


class MockMeteoRepo implements IMeteoRepo {
    /* @var $readSmaMeasurementsArgs array */
    public $readSmaMeasurementsArgs;
    /* @var $readSmaMeasurementsResult array */
    public $readSmaMeasurementsResult;
    /* @var $replaceSmaStationsArgs array */
    public $replaceSmaStationsArgs;


    public function readSmaMeasurements(Extent $extent): array {
        $this->readSmaMeasurementsArgs = [$extent];

        return $this->readSmaMeasurementsResult;
    }


    public function replaceSmaStations(array $smaStationList): void {
        $this->replaceSmaStationsArgs = $smaStationList;
    }
}
