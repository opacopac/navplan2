<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase;

use Navplan\MeteoSma\Domain\ReadSmaMeasurementsRequest;
use Navplan\MeteoSma\Domain\ReadSmaMeasurementsResponse;


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
