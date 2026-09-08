<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Geoname module.
 * Replaces the former ProdGeonameDiContainer.
 * IDbService is already provided by the System module's definitions file.
 * ITerrainService is bridged in ProdNavplanDiContainer (Terrain not yet migrated).
 */

use Navplan\Geoname\Domain\Service\GeonameService;
use Navplan\Geoname\Domain\Service\IGeonameRepo;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Geoname\Persistence\Repo\DbGeonameRepo;
use function DI\autowire;

return [
    IGeonameRepo::class => autowire(DbGeonameRepo::class),
    IGeonameService::class => autowire(GeonameService::class),
];
