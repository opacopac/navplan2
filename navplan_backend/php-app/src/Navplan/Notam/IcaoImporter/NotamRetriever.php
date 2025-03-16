<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";

use Exception;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\MySqlDb\DbHelper;


global $diContainer;

$retriever = new NotamRetriever(
    $diContainer->getSystemDiContainer()->getLoggingService(),
    $diContainer->getDbService()
);
$retriever->go();


class NotamRetriever
{
    const NOTAM_BASE_URL = "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/states/notams/notams-list?api_key=2a9daa70-2604-11e7-a2b8-e55a51cc8ef0&format=json&states=";


    public function __construct(
        private ILoggingService $logger,
        private IDbService $dbService
    )
    {
    }


    public function go()
    {
        // load all countries
        $query = "SELECT DISTINCT statecode FROM icao_fir";
        $result = $this->dbService->execMultiResultQuery($query, "error reading state codes");

        $countryList = [];
        while ($rs = $result->fetch_assoc()) {
            $countryList[] = $rs["statecode"];
        }

        // load from icao in 10-chunks
        $chunkedCountryList = array_chunk($countryList, 10);
        foreach ($chunkedCountryList as $countryChunk) {
            // load notams from icao
            $url = self::NOTAM_BASE_URL . join(",", $countryChunk);
            $this->logger->info("fetching NOTAMs for " . join(",", $countryChunk));
            $time1 = microtime(true);

            try {
                $response = file_get_contents($url);
            } catch (Exception $e) {
                $this->logger->error("error while fetching notams after " . round(1000 * (microtime(true) - $time1)) . "ms:" . $e->getMessage());
                continue;  // ignore errors / timeouts from icao
            }

            if ($response === FALSE) {
                $this->logger->error("error while fetching notams after " . round(1000 * (microtime(true) - $time1)) . "ms");
                continue;  // ignore errors / timeouts from icao
            }

            $this->logger->info("successful (" . round(1000 * (microtime(true) - $time1)) . "ms)");

            $notamList = json_decode($response, true, JSON_NUMERIC_CHECK);

            // delete existing notams from db
            $query = "DELETE FROM icao_notam WHERE country in ('" . join("','", $countryChunk) . "')";
            $this->dbService->execCUDQuery($query, "error deleting notams");

            // add updated notams to db
            if (count($notamList) > 0) {
                $queryParts = [];
                foreach ($notamList as $notam) {
                    unset($notam["dbExtent"]);

                    $fields = [];
                    $fields[] = $this->dbService->escapeAndQuoteString($notam["id"]);
                    $fields[] = $this->dbService->escapeAndQuoteString($notam["StateCode"]);
                    $fields[] = $this->dbService->escapeAndQuoteString($notam["type"]);
                    $fields[] = $this->dbService->escapeAndQuoteString($notam["location"]);
                    $fields[] = "'" . DbHelper::getDbUtcTimeString(strtotime($notam["startdate"])) . "'";
                    $fields[] = "'" . DbHelper::getDbUtcTimeString(strtotime($notam["enddate"])) . "'";
                    $fields[] = $this->dbService->escapeAndQuoteString(json_encode($notam, JSON_NUMERIC_CHECK));
                    $queryParts[] = "(" . join(",", $fields) . ")";
                }

                if (count($queryParts) > 0) {
                    $query = "INSERT INTO icao_notam (notam_id, country, type, icao, startdate, enddate, notam) VALUES " . join(",", $queryParts);
                    $this->dbService->execCUDQuery($query, "error adding notams");
                }
            }
        }
    }
}
