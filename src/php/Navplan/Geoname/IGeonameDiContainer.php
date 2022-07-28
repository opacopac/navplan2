<?php declare(strict_types=1);

namespace Navplan\Geoname;

use Navplan\Geoname\DomainService\IGeonameService;


interface IGeonameDiContainer {
    function getGeonameService(): IGeonameService;
}
