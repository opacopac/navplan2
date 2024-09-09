<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAircraftTypeDesignatorCreateCommand implements IAircraftTypeDesignatorCreateCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function create(AircraftTypeDesignator $acTypeDesignator): AircraftTypeDesignator
    {
        $query = $this->getAcTypeDesignatorInsertSql($acTypeDesignator);
        $this->dbService->execCUDQuery($query, "error creating aircraft type designator");
        $acTypeDesignator->id = $this->dbService->getInsertId();

        return $acTypeDesignator;
    }


    private function getAcTypeDesignatorInsertSql(AircraftTypeDesignator $typeDesignator): string
    {
        $query = "INSERT INTO " . DbTableAircraftTypeDesignator::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableAircraftTypeDesignator::COL_DESIGNATOR,
            DbTableAircraftTypeDesignator::COL_MODEL,
            DbTableAircraftTypeDesignator::COL_MANUFACTURER,
            DbTableAircraftTypeDesignator::COL_AC_TYPE,
            DbTableAircraftTypeDesignator::COL_ENG_TYPE,
            DbTableAircraftTypeDesignator::COL_ENG_COUNT,
            DbTableAircraftTypeDesignator::COL_WTC,
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbStringValue($this->dbService, $typeDesignator->designator),
            DbHelper::getDbStringValue($this->dbService, $typeDesignator->model),
            DbHelper::getDbStringValue($this->dbService, $typeDesignator->manufacturer),
            DbHelper::getDbStringValue($this->dbService, $typeDesignator->ac_type->value),
            DbHelper::getDbStringValue($this->dbService, $typeDesignator->engine_type->value),
            DbHelper::getDbIntValue($typeDesignator->engine_count),
            DbHelper::getDbStringValue($this->dbService, $typeDesignator->wtc),
        ]);
        $query .= ")";

        return $query;
    }
}
