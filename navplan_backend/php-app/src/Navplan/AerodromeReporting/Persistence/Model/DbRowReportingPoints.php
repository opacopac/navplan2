<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowReportingPoints extends DbRow
{
    public function getId(): int
    {
        return StringNumberHelper::parseIntOrError($this->row, DbTableReportingPoints::COL_ID);
    }


    public function getType(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableReportingPoints::COL_TYPE);
    }


    public function getAirportIcao(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableReportingPoints::COL_AD_ICAO);
    }


    public function getName(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableReportingPoints::COL_NAME);
    }


    public function isHeli(): bool
    {
        return StringNumberHelper::parseBoolOrFalse($this->row, DbTableReportingPoints::COL_HELI);
    }


    public function isInbdComp(): bool
    {
        return StringNumberHelper::parseBoolOrFalse($this->row, DbTableReportingPoints::COL_INBD_COMP);
    }


    public function isOutbdComp(): bool
    {
        return StringNumberHelper::parseBoolOrFalse($this->row, DbTableReportingPoints::COL_OUTBD_COMP);
    }


    public function getMinFt(): ?int
    {
        return StringNumberHelper::parseIntOrNull($this->row, DbTableReportingPoints::COL_MIN_FT);
    }


    public function getMaxFt(): ?int
    {
        return StringNumberHelper::parseIntOrNull($this->row, DbTableReportingPoints::COL_MAX_FT);
    }


    public function getPosition(): ?Position2d
    {
        return DbPosition2dConverter::fromDbRow($this->row);
    }


    public function getPolygon(): ?string
    {
        return StringNumberHelper::parseStringOrNull($this->row, DbTableReportingPoints::COL_POLYGON);
    }
}
