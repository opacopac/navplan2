<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Mocks;

use Navplan\Geometry\Domain\Extent;
use Navplan\Meteo\UseCase\IMeteoRepo;


class MockMeteoRepo implements IMeteoRepo {
    /* @var $readSmaMeasurementsResult array */
    public $readSmaMeasurementsResult;
    /* @var $readSmaMeasurementsArgs array */
    public $readSmaMeasurementsArgs;


    public function readSmaMeasurements(Extent $extent): array {
        $this->readSmaMeasurementsArgs = [$extent];

        return $this->readSmaMeasurementsResult;
    }
}
