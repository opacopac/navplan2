<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase\ReadSmaMeasurements;

use Navplan\MeteoSma\DomainService\IMeteoRepo;


class ReadSmaMeasurementsUc implements IReadSmaMeasurementsUc {
    public function __construct(private IMeteoRepo $meteoRepo) {
    }


    public function read(ReadSmaMeasurementsRequest $request): ReadSmaMeasurementsResponse {
        $measurements = $this->meteoRepo->readSmaMeasurements($request->extent);

        return new ReadSmaMeasurementsResponse($measurements);
    }
}
