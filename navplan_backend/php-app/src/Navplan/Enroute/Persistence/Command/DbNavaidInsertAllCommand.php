<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Command;

use Navplan\Common\GeoHelper;
use Navplan\Enroute\Domain\Command\INavaidInsertAllCommand;
use Navplan\Enroute\Persistence\Model\DbTableNavaid;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


class DbNavaidInsertAllCommand implements INavaidInsertAllCommand {
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function insertAll(array $navaids): void {
        $query = "INSERT INTO " . DbTableNavaid::TABLE_NAME . " (" . join(", ", [
                DbTableNavaid::COL_TYPE,
                DbTableNavaid::COL_KUERZEL,
                DbTableNavaid::COL_NAME,
                DbTableNavaid::COL_COUNTRY,
                DbTableNavaid::COL_LONGITUDE,
                DbTableNavaid::COL_LATITUDE,
                DbTableNavaid::COL_ELEVATION,
                DbTableNavaid::COL_FREQUENCY,
                DbTableNavaid::COL_DECLINATION,
                DbTableNavaid::COL_TRUENORTH,
                DbTableNavaid::COL_GEOHASH,
                DbTableNavaid::COL_LONLAT
            ]) . ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?))";

        $statement = $this->dbService->prepareStatement($query);

        foreach ($navaids as $navaid) {
            try {
                $type = $navaid->type->value;
                $elevation = $navaid->elevation->getHeightAmsl()->getM();
                $geoHash = GeoHelper::calcGeoHash($navaid->position->longitude, $navaid->position->latitude, 14); // TODO
                $lonlat = "POINT(" . $navaid->position->longitude . " " . $navaid->position->latitude . ")";
                $country = "XX"; // TODO

                $statement->bind_param("ssssdddsdiss",
                    $type,
                    $navaid->kuerzel,
                    $navaid->name,
                    $country,
                    $navaid->position->longitude,
                    $navaid->position->latitude,
                    $elevation,
                    $navaid->frequency->value,
                    $navaid->declination,
                    $navaid->isTrueNorth,
                    $geoHash,
                    $lonlat
                );

                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting navaid '" . $navaid->name . "'");
                throw $ex;
            }
        }
    }
}
