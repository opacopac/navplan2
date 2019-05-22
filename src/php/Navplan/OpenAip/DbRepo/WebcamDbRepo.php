<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Webcam;
use Navplan\OpenAip\RepoGateway\IWebcamRepo;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;


class WebcamDbRepo implements IWebcamRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat): array {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IS NULL";
        $query .= "   AND (longitude >= " . $minLon . " AND longitude <= " . $maxLon . " AND latitude >= " . $minLat . " AND latitude <= " . $maxLat . ")";

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
