<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\IReadSmaMeasurementsUc;
use Navplan\System\DomainService\IHttpService;


interface IMeteoServiceDiContainer {
    function getHttpService(): IHttpService;

    function getReadSmaMeasurementsUc(): IReadSmaMeasurementsUc;
}
