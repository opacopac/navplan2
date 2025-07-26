<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Command;

use Navplan\Common\GeoHelper;
use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Model\DbException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbInsertCommandBuilder;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


class DbNavaidInsertAllCommand implements INavaidInsertAllCommand
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly ILoggingService $loggingService
    )
    {
    }


    /**
     * @throws Throwable
     * @throws DbException
     */
    public function insertAll(array $navaids): void
    {
        $t = new DbTableNavaid();
        $icb = MySqlDbInsertCommandBuilder::create($this->dbService)
            ->insertInto($t)
            ->setValue($t->colType(), null)
            ->setValue($t->colCountry(), null)
            ->setValue($t->colName(), null)
            ->setValue($t->colKuerzel(), null)
            ->setValue($t->colLat(), null)
            ->setValue($t->colLon(), null)
            ->setValue($t->colElevation(), null)
            ->setValue($t->colFrequency(), null)
            ->setValue($t->colDeclination(), null)
            ->setValue($t->colTrueNorth(), null)
            ->setValue($t->colGeoHash(), null)
            ->setValue($t->colLonlat(), null);

        $query = $icb->build(true);
        $bindParamTypes = $icb->buildBindParamTypes();

        $statement = $this->dbService->prepareStatement($query);

        foreach ($navaids as $navaid) {
            try {
                // TODO: bind more beautifully/generically
                $type = $navaid->type->value;
                $elevation = $navaid->elevation->getHeightAmsl()->getM();
                $geoHash = GeoHelper::calcGeoHash($navaid->position->longitude, $navaid->position->latitude, 14); // TODO
                $lonlat = "POINT(" . $navaid->position->longitude . " " . $navaid->position->latitude . ")";
                $country = "XX"; // TODO

                $statement->bind_param(
                    $bindParamTypes,
                    $type,
                    $country,
                    $navaid->name,
                    $navaid->kuerzel,
                    $navaid->position->latitude,
                    $navaid->position->longitude,
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
