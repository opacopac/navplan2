<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase\ReadSmaMeasurements;


interface IReadSmaMeasurementsUc {
    function read(ReadSmaMeasurementsRequest $request): ReadSmaMeasurementsResponse;
}
