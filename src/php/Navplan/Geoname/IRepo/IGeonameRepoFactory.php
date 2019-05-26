<?php declare(strict_types=1);

namespace Navplan\Geoname\IRepo;


interface IGeonameRepoFactory {
    function createGeonameRepo(): IGeonameRepo;
}
