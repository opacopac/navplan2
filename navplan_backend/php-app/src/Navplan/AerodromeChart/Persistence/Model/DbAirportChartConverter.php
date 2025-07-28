<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/**
 * @extends DbEntityConverter<AirportChart>
 */
class DbAirportChartConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAirportCharts $table)
    {
    }


    public function fromDbRow(array $row): AirportChart
    {
        $r = new DbRowAirportCharts($this->table, $row);

        return new AirportChart(
            $r->getId(),
            $r->getUserId(),
            $r->getAdIcao(),
            $r->getSource(),
            $r->getName(),
            $r->getFilename(),
            $r->getExtent(),
            DbOriginalFileParametersConverter::fromDbRow($r),
            DbChartRegistrationConverter::fromDbRow($r),
        );
    }


    public function bindInsertValues(AirportChart $adChart, ?int $userId, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colAdIcao(), $adChart->airportIcao)
            ->setColValue($this->table->colUserId(), $userId)
            ->setColValue($this->table->colSource(), $adChart->source)
            ->setColValue($this->table->colName(), $adChart->name)
            ->setColValue($this->table->colActive(), 1)
            ->setColValue($this->table->colFilename(), $adChart->filename)
            ->setColValue($this->table->colMinLon(), $adChart->extent->minPos->longitude)
            ->setColValue($this->table->colMinLat(), $adChart->extent->minPos->latitude)
            ->setColValue($this->table->colMaxLon(), $adChart->extent->maxPos->longitude)
            ->setColValue($this->table->colMaxLat(), $adChart->extent->maxPos->latitude);

        DbOriginalFileParametersConverter::bindInsertValues($adChart->originalFileParameters, $icb, $this->table);
        DbChartRegistrationConverter::bindInsertValues($adChart->chartRegistration, $icb, $this->table);
    }
}
