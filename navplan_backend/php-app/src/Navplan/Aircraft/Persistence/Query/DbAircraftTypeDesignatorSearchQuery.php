<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Query\IAircraftTypeDesignatorSearchQuery;
use Navplan\Aircraft\Persistence\Model\DbAircraftTypeDesignatorConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAircraftTypeDesignatorSearchQuery implements IAircraftTypeDesignatorSearchQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function search(string $searchText, int $maxResults): array
    {
        $prefixSearchText = DbHelper::getDbStringValue($this->dbService, strtolower(trim($searchText)) . '%');
        $fullSearchText = DbHelper::getDbStringValue($this->dbService, '%' . strtolower(trim($searchText)) . '%');

        $query = "(";
        $query .= "SELECT * FROM " . DbTableAircraftTypeDesignator::TABLE_NAME;
        $query .= " WHERE LOWER(" . DbTableAircraftTypeDesignator::COL_DESIGNATOR . ") LIKE " . $prefixSearchText;
        $query .= " ORDER BY " . DbTableAircraftTypeDesignator::COL_DESIGNATOR;
        $query .= " LIMIT " . $maxResults;
        $query .= ") UNION (";
        $query .= "SELECT * FROM " . DbTableAircraftTypeDesignator::TABLE_NAME;
        $query .= " WHERE CONCAT(";
        $query .= "  LOWER(" . DbTableAircraftTypeDesignator::COL_MANUFACTURER . "),";
        $query .= "  ' ',";
        $query .= "  LOWER(" . DbTableAircraftTypeDesignator::COL_MODEL . ")";
        $query .= " ) LIKE " . $fullSearchText;
        $query .= " ORDER BY " . DbTableAircraftTypeDesignator::COL_MANUFACTURER . "," . DbTableAircraftTypeDesignator::COL_MODEL;
        $query .= " LIMIT " . $maxResults;
        $query .= ")";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft type designators");

        return DbAircraftTypeDesignatorConverter::fromDbResult($result);
    }
}
