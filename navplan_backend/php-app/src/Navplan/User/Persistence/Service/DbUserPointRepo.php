<?php declare(strict_types=1);

namespace Navplan\User\Persistence\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\User\Domain\Service\IUserPointRepo;
use Navplan\User\Persistence\Model\UserPointConverter;


class DbUserPointRepo implements IUserPointRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function searchByExtent(Extent2d $extent, string $email): array {
        $email = $this->dbService->escapeString($email);

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = '" . $email . "'";
        $query .= "  AND (uwp.longitude >= " . $extent->minPos->longitude . " AND uwp.longitude <= " . $extent->maxPos->longitude .
            " AND uwp.latitude >= " . $extent->minPos->latitude . " AND uwp.latitude <= " . $extent->maxPos->latitude . ")";

        $result = $this->dbService->execMultiResultQuery($query, "error searching user points by extent");

        return self::readUserPointFromResultList($result);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $email): array {
        $email = $this->dbService->escapeString($email);

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

        $result = $this->dbService->execMultiResultQuery($query, "error searching user points by position");

        return self::readUserPointFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults, string $email): array {
        $searchText = $this->dbService->escapeString($searchText);
        $email = $this->dbService->escapeString($email);

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "   usr.email = '" . $email . "'";
        $query .= "   AND name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching user points by text");

        return self::readUserPointFromResultList($result);
    }


    private static function readUserPointFromResultList(IDbResult $result): array {
        $userPoint = [];
        while ($row = $result->fetch_assoc()) {
            $userPoint[] = UserPointConverter::fromDbRow($row);
        }

        return $userPoint;
    }
}
