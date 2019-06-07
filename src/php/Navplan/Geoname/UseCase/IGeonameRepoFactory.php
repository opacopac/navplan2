<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase;


interface IGeonameRepoFactory {
    function createGeonameRepo(): IGeonameRepo;
}
