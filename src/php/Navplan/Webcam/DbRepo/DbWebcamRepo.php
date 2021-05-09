<?php declare(strict_types=1);

namespace Navplan\Webcam\DbRepo;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\System\DomainService\IDbService;
use Navplan\Webcam\DbModel\DbWebcamConverter;
use Navplan\Webcam\DomainService\IWebcamRepo;


class DbWebcamRepo implements IWebcamRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function searchByExtent(Extent2d $extent): array {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IS NULL";
        $query .= "   AND (longitude >= " . $extent->minPos->longitude . " AND longitude <= " . $extent->maxPos->longitude .
            " AND latitude >= " . $extent->minPos->latitude . " AND latitude <= " . $extent->maxPos->latitude . ")";

        $result = $this->dbService->execMultiResultQuery($query, "error reading webcams");

        $webcams = [];
        while ($row = $result->fetch_assoc()) {
            $webcams[] = DbWebcamConverter::fromDbRow($row);
        }

        return $webcams;
    }
}
