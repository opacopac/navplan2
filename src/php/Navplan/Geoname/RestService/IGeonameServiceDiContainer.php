<?php declare(strict_types=1);

namespace Navplan\Geoname\RestService;

use Navplan\Geoname\DomainService\IGeonameService;


interface IGeonameServiceDiContainer {
    function getGeonameService(): IGeonameService;
}
