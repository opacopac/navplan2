<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Db\UseCase\IDbResult;
use Navplan\Db\UseCase\IDbService;
use Navplan\User\UseCase\IUserPointRepo;



class DbUserPointRepo implements IUserPointRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(Extent $extent, string $email): array {
        $email = $this->getDbService()->escapeString($email);

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = '" . $email . "'";
        $query .= "  AND (uwp.longitude >= " . $extent->minPos->longitude . " AND uwp.longitude <= " . $extent->maxPos->longitude .
            " AND uwp.latitude >= " . $extent->minPos->latitude . " AND uwp.latitude <= " . $extent->maxPos->latitude . ")";

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching user points by extent");

        return self::readUserPointFromResultList($result);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $email): array {
        $email = $this->getDbService()->escapeString($email);

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = '" . $email . "'";
        $query .= "  AND latitude > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND latitude < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND longitude > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND longitude < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $position->latitude . ") * (latitude - " . $position->latitude .
            ") + (longitude - " . $position->longitude . ") * (longitude - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching user points by position");

        return self::readUserPointFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults, string $email): array {
        $searchText = $this->getDbService()->escapeString($searchText);
        $email = $this->getDbService()->escapeString($email);

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "   usr.email = '" . $email . "'";
        $query .= "   AND name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching user points by text");

        return self::readUserPointFromResultList($result);
    }


    private static function readUserPointFromResultList(IDbResult $result): array {
        $userPoint = [];
        while ($rs = $result->fetch_assoc()) {
            $userPoint[] = DbUserPoint::fromDbResult($rs);
        }

        return $userPoint;
    }
}
