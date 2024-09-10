<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Query\IAircraftTypeDesignatorSearchQuery;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAircraftTypeDesignatorSearchQuery implements IAircraftTypeDesignatorSearchQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function search(string $searchText, int $maxResults): array
    {
        $searchText = DbHelper::getDbStringValue($this->dbService, '%' . strtolower(trim($searchText)) . '%');

        $query = "SELECT * FROM " . DbTableAircraftTypeDesignator::TABLE_NAME;
        $query .= " WHERE LOWER(" . DbTableAircraftTypeDesignator::COL_DESIGNATOR . ") LIKE " . $searchText;
        $query .= " OR LOWER(" . DbTableAircraftTypeDesignator::COL_MODEL . ") LIKE " . $searchText;
        $query .= " OR LOWER(" . DbTableAircraftTypeDesignator::COL_MANUFACTURER . ") LIKE " . $searchText;
        $query .= " ORDER BY " . DbTableAircraftTypeDesignator::COL_DESIGNATOR;
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft type designators");

        return DbAircraftTypeDesignatorConverter::fromDbResult($result);
    }
}
