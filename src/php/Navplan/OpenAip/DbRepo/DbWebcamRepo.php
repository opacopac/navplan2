<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Webcam;
use Navplan\OpenAip\UseCase\IWebcamRepo;
use Navplan\Db\UseCase\IDbService;
use Navplan\Shared\StringNumberService;


class DbWebcamRepo implements IWebcamRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(Extent $extent): array {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IS NULL";
        $query .= "   AND (longitude >= " . $extent->minPos->longitude . " AND longitude <= " . $extent->maxPos->longitude .
            " AND latitude >= " . $extent->minPos->latitude . " AND latitude <= " . $extent->maxPos->latitude . ")";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading webcams");

        $webcams = [];
        while ($rs = $result->fetch_assoc()) {
            $webcams[] = self::readWebcamFromResult($rs);
        }

        return $webcams;
    }


    private function readWebcamFromResult(array $rs): Webcam {
        return new Webcam(
            $rs["name"],
            $rs["url"],
            $this->getPosition($rs)
        );
    }


    private function getPosition(array $rs): ?Position2d {
        if (StringNumberService::isNullOrEmpty($rs, "latitude") || StringNumberService::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }

}
