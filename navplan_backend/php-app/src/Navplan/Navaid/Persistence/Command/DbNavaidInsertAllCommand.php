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
            ->insertInto($t);

        foreach ($navaids as $navaid) {
            try {
                $statement = $icb
                    ->setColValue($t->colType(), $navaid->type->value)
                    ->setColValue($t->colCountry(), "XX")
                    ->setColValue($t->colName(), $navaid->name)
                    ->setColValue($t->colKuerzel(), $navaid->kuerzel)
                    ->setColValue($t->colLat(), $navaid->position->latitude)
                    ->setColValue($t->colLon(), $navaid->position->longitude)
                    ->setColValue($t->colElevation(), $navaid->elevation->getHeightAmsl()->getM())
                    ->setColValue($t->colFrequency(), $navaid->frequency->value)
                    ->setColValue($t->colDeclination(), $navaid->declination)
                    ->setColValue($t->colTrueNorth(), $navaid->isTrueNorth)
                    ->setColValue($t->colGeoHash(), GeoHelper::calcGeoHash(
                        $navaid->position->longitude, $navaid->position->latitude, 14)) // TODO: geohash precision
                    ->setColValue($t->colLonlat(), $navaid->position)
                    ->buildAndBindStatement();
                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting navaid '" . $navaid->name . "'");
                throw $ex;
            }
        }
    }
}
