<?php declare(strict_types=1);

namespace Navplan\Meteo\UseCase;

use Navplan\Meteo\Domain\ReadSmaMeasurementsRequest;
use Navplan\Meteo\Domain\ReadSmaMeasurementsResponse;


class ReadSmaMeasurements {
    /* @var $meteoRepo IMeteoRepo */
    private $meteoRepo;


    public function __construct(IMeteoConfig $config) {
        $this->meteoRepo = $config->getMeteoRepo();
    }


    public function read(ReadSmaMeasurementsRequest $request): ReadSmaMeasurementsResponse {
        $measurements = $this->meteoRepo->readSmaMeasurements($request->extent);

        return new ReadSmaMeasurementsResponse($measurements);
    }
}
