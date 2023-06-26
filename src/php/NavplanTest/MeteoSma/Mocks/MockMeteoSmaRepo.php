<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaRepo;


class MockMeteoSmaRepo implements IMeteoSmaRepo {
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
