<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowNavaid extends DbRow
{
    public function getId(): int
    {
        return StringNumberHelper::parseIntOrError($this->row, DbTableNavaid::COL_ID);
    }


    public function getType(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableNavaid::COL_TYPE);
    }


    public function getCountry(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableNavaid::COL_COUNTRY);
    }


    public function getName(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableNavaid::COL_NAME);
    }


    public function getKuerzel(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableNavaid::COL_KUERZEL);
    }


    public function getPosition(): Position2d
    {
        return DbPosition2dConverter::fromDbRow($this->row);
    }


    public function getElevation(): float
    {
        return StringNumberHelper::parseFloatOrError($this->row, DbTableNavaid::COL_ELEVATION);
    }


    public function getFrequency(): string
    {
        return StringNumberHelper::parseStringOrError($this->row, DbTableNavaid::COL_FREQUENCY);
    }


    public function getDeclination(): float
    {
        return StringNumberHelper::parseFloatOrError($this->row, DbTableNavaid::COL_DECLINATION);
    }


    public function isTrueNorth(): bool
    {
        return StringNumberHelper::parseBoolOrFalse($this->row, DbTableNavaid::COL_TRUENORTH);
    }
}
