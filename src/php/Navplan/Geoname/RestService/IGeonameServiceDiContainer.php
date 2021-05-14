<?php declare(strict_types=1);

namespace Navplan\Geoname\RestService;

use Navplan\Geoname\DomainService\IGeonameRepo;


interface IGeonameServiceDiContainer {
    function getGeonameRepo(): IGeonameRepo;
}
