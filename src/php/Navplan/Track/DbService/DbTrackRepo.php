<?php declare(strict_types=1);

namespace Navplan\Track\DbService;

use Navplan\System\DomainService\IDbService;
use Navplan\Track\DbModel\DbTrackConverter;
use Navplan\Track\DomainModel\Track;
use Navplan\Track\DomainService\ITrackRepo;


class DbTrackRepo implements ITrackRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function readTrackList(string $email): array {
        $query = "SELECT utr.id, utr.timestamp, utr.name, '[]' AS positions";
        $query .= " FROM user_tracks AS utr";
        $query .= " JOIN users AS usr ON utr.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = " . $this->dbService->escapeAndQuoteString($email);
        $query .= " ORDER BY";
        $query .= "  utr.timestamp DESC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading track list");

        return DbTrackConverter::fromDbResult($result);
    }


    public function readTrack(int $trackId, string $email): Track {
        $query = "SELECT utr.*";
        $query .= " FROM user_tracks AS utr";
        $query .= " JOIN users AS usr ON utr.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  utr.id = " . $trackId;
        $query .= "   AND";
        $query .= "  usr.email = " . $this->dbService->escapeAndQuoteString($email);

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading track list");

        return DbTrackConverter::fromDbResult($result)[0];
    }


    public function createTrack(Track $track, string $email): bool {
        die;
        // TODO: Implement createTrack() method.
    }


    public function updateTrack(Track $track, string $email): bool {
        die;
        // TODO: Implement updateTrack() method.
    }


    public function deleteTrack(string $trackId, string $email): bool {
        die;
        // TODO: Implement deleteTrack() method.
    }
}
