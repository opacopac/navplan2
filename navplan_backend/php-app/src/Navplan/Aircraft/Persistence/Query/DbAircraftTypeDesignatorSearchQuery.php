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


    public function search(string $searchText): array
    {
        $searchText = DbHelper::getDbStringValue($this->dbService, trim($searchText));

        $query = "SELECT * FROM " . DbTableAircraftTypeDesignator::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftTypeDesignator::COL_AC_TYPE . " LIKE %" . $searchText . "%";
        $query .= " OR " . DbTableAircraftTypeDesignator::COL_DESIGNATOR . " LIKE %" . $searchText . "%";
        $query .= " OR " . DbTableAircraftTypeDesignator::COL_MANUFACTURER . " LIKE %" . $searchText . "%";
        $query .= " ORDER BY " . DbTableAircraftTypeDesignator::COL_AC_TYPE;

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft type designators");

        return DbAircraftTypeDesignatorConverter::fromDbResult($result);
    }
}
