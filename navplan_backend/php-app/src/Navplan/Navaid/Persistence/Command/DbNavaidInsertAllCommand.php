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
            ->addCol($t->colType())
            ->addCol($t->colCountry())
            ->addCol($t->colName())
            ->addCol($t->colKuerzel())
            ->addCol($t->colLat())
            ->addCol($t->colLon())
            ->addCol($t->colElevation())
            ->addCol($t->colFrequency())
            ->addCol($t->colDeclination())
            ->addCol($t->colTrueNorth())
            ->addCol($t->colGeoHash())
            ->addCol($t->colLonlat());

        $statement = $icb->buildStatement();

        foreach ($navaids as $navaid) {
            try {
                $icb->setColValue($t->colType(), $navaid->type->value);
                $icb->setColValue($t->colCountry(), "XX"); // TODO: country code
                $icb->setColValue($t->colName(), $navaid->name);
                $icb->setColValue($t->colKuerzel(), $navaid->kuerzel);
                $icb->setColValue($t->colLat(), $navaid->position->latitude);
                $icb->setColValue($t->colLon(), $navaid->position->longitude);
                $icb->setColValue($t->colElevation(), $navaid->elevation->getHeightAmsl()->getM());
                $icb->setColValue($t->colFrequency(), $navaid->frequency->value);
                $icb->setColValue($t->colDeclination(), $navaid->declination);
                $icb->setColValue($t->colTrueNorth(), $navaid->isTrueNorth);
                $icb->setColValue($t->colGeoHash(), GeoHelper::calcGeoHash(
                    $navaid->position->longitude, $navaid->position->latitude, 14)); // TODO: geohash precision
                $icb->setColValue($t->colLonlat(), $navaid->position);
                $icb->bindStatementValues();

                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting navaid '" . $navaid->name . "'");
                throw $ex;
            }
        }
    }
}
