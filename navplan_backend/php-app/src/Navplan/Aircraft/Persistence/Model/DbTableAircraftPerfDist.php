<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAircraftPerfDist extends DbTable
{
    public const TABLE_NAME = "aircraft_perf_dist";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_TYPE = "type";
    public const COL_PROFILE_NAME = "profile_name";
    public const COL_ALT_REF = "alt_ref";
    public const COL_ALT_STEPS = "alt_steps";
    public const COL_ALT_UNIT = "alt_unit";
    public const COL_TEMP_REF = "temp_ref";
    public const COL_TEMP_STEPS = "temp_steps";
    public const COL_TEMP_UNIT = "temp_unit";
    public const COL_DISTANCES = "distances";
    public const COL_DISTANCE_UNIT = "distance_unit";
    public const COL_HEADWIND_DEC_PERC = "headwind_dec_perc";
    public const COL_HEADWIND_DEC_PER_SPEED = "headwind_dec_per_speed";
    public const COL_TAILWIND_INC_PERC = "tailwind_inc_perc";
    public const COL_TAILWIND_INC_PER_SPEED = "tailwind_inc_per_speed";
    public const COL_SPEED_UNIT = "speed_unit";
    public const COL_GRASS_RWY_INC_PERC = "grass_rwy_inc_perc";
    public const COL_WET_RWY_INC_PERC = "wet_rwy_inc_perc";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_ID_AIRCRAFT, DbColType::INT);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_PROFILE_NAME, DbColType::STRING);
        $this->addCol(self::COL_ALT_REF, DbColType::STRING);
        $this->addCol(self::COL_ALT_STEPS, DbColType::STRING);
        $this->addCol(self::COL_ALT_UNIT, DbColType::STRING);
        $this->addCol(self::COL_TEMP_REF, DbColType::STRING);
        $this->addCol(self::COL_TEMP_STEPS, DbColType::STRING);
        $this->addCol(self::COL_TEMP_UNIT, DbColType::STRING);
        $this->addCol(self::COL_DISTANCES, DbColType::STRING);
        $this->addCol(self::COL_DISTANCE_UNIT, DbColType::STRING);
        $this->addCol(self::COL_HEADWIND_DEC_PERC, DbColType::DOUBLE);
        $this->addCol(self::COL_HEADWIND_DEC_PER_SPEED, DbColType::DOUBLE);
        $this->addCol(self::COL_TAILWIND_INC_PERC, DbColType::DOUBLE);
        $this->addCol(self::COL_TAILWIND_INC_PER_SPEED, DbColType::DOUBLE);
        $this->addCol(self::COL_SPEED_UNIT, DbColType::STRING);
        $this->addCol(self::COL_GRASS_RWY_INC_PERC, DbColType::DOUBLE);
        $this->addCol(self::COL_WET_RWY_INC_PERC, DbColType::DOUBLE);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colIdAircraft(): DbCol
    {
        return self::getCol(self::COL_ID_AIRCRAFT);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colProfileName(): DbCol
    {
        return self::getCol(self::COL_PROFILE_NAME);
    }


    public function colAltRef(): DbCol
    {
        return self::getCol(self::COL_ALT_REF);
    }


    public function colAltSteps(): DbCol
    {
        return self::getCol(self::COL_ALT_STEPS);
    }


    public function colAltUnit(): DbCol
    {
        return self::getCol(self::COL_ALT_UNIT);
    }


    public function colTempRef(): DbCol
    {
        return self::getCol(self::COL_TEMP_REF);
    }


    public function colTempSteps(): DbCol
    {
        return self::getCol(self::COL_TEMP_STEPS);
    }


    public function colTempUnit(): DbCol
    {
        return self::getCol(self::COL_TEMP_UNIT);
    }


    public function colDistances(): DbCol
    {
        return self::getCol(self::COL_DISTANCES);
    }


    public function colDistanceUnit(): DbCol
    {
        return self::getCol(self::COL_DISTANCE_UNIT);
    }


    public function colHeadwindDecPerc(): DbCol
    {
        return self::getCol(self::COL_HEADWIND_DEC_PERC);
    }


    public function colHeadwindDecPerSpeed(): DbCol
    {
        return self::getCol(self::COL_HEADWIND_DEC_PER_SPEED);
    }


    public function colTailwindIncPerc(): DbCol
    {
        return self::getCol(self::COL_TAILWIND_INC_PERC);
    }


    public function colTailwindIncPerSpeed(): DbCol
    {
        return self::getCol(self::COL_TAILWIND_INC_PER_SPEED);
    }


    public function colSpeedUnit(): DbCol
    {
        return self::getCol(self::COL_SPEED_UNIT);
    }


    public function colGrassRwyIncPerc(): DbCol
    {
        return self::getCol(self::COL_GRASS_RWY_INC_PERC);
    }


    public function colWetRwyIncPerc(): DbCol
    {
        return self::getCol(self::COL_WET_RWY_INC_PERC);
    }
}
