<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Navaid\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Navaid\Persistence\Model\DbNavaidConverter;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;


class DbNavaidSearchByPositionQuery implements INavaidSearchByPositionQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        $t = new DbTableNavaid();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->whereInMaxDist($t->colLatitude(), $t->colLongitude(), $position, $maxRadius_deg)
            ->orderByLatLonDist($t->colLatitude(), $t->colLongitude(), $position)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by position");

        return DbNavaidConverter::fromDbResult($result);
    }
}
