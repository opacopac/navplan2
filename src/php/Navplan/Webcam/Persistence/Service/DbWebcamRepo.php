<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Service;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\System\Domain\Service\IDbService;
use Navplan\Webcam\Domain\Service\IWebcamRepo;
use Navplan\Webcam\Persistence\Model\DbWebcamConverter;


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


    function searchByIcao(array $airportIcaoList): array {
        $airportIcaoStr = join(
            ",",
            array_map(
                function ($airportIcao) { return $this->dbService->escapeAndQuoteString($airportIcao); },
                $airportIcaoList
            )
        );
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IN (" .  $airportIcaoStr . ")";
        $query .= " ORDER BY";
        $query .= "   name ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading webcams");

        $webcams = [];
        while ($row = $result->fetch_assoc()) {
            $webcams[] = DbWebcamConverter::fromDbRow($row);
        }

        return $webcams;
    }
}
