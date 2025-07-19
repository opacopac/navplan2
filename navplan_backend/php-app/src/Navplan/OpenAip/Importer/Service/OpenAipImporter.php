<?php declare(strict_types=1);

namespace Navplan\OpenAip\Importer\Service;

use Exception;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\ApiAdapter\Service\OpenAipImportFilter;
use Navplan\OpenAip\Importer\Model\ImportResult;
use Navplan\OpenAip\ZoomLevelSorter\AirportZoomLevelSortItem;
use Navplan\OpenAip\ZoomLevelSorter\AirspaceDetaillevelCreator;
use Navplan\OpenAip\ZoomLevelSorter\NavaidZoomLevelSortItem;
use Navplan\OpenAip\ZoomLevelSorter\ZoomLevelSorter;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;


class OpenAipImporter implements IOpenAipImporter
{
    private ?OpenAipImportFilter $importFilter = null;


    public function __construct(
        private IOpenAipService $openAipApiService,
        private IAirportService $airportService,
        private IAirspaceService $airspaceService,
        private INavaidService $navaidService,
        private ILoggingService $loggingService,
        private IDbService $dbService
    )
    {
    }


    public function setImportFilter(?OpenAipImportFilter $importFilter): void
    {
        $this->importFilter = $importFilter;
    }


    public function testConnection(): bool
    {
        $this->loggingService->info("testing connection to openaip...");
        try {
            $this->openAipApiService->readNavaids();
            $this->loggingService->info("connection successful");
            return true;
        } catch (Exception $e) {
            $this->loggingService->error("connection failed: " . $e->getMessage());
            $this->loggingService->error("inner exception: " . $e->getTraceAsString());
            return false;
        }
    }


    public function importAirports(): ImportResult
    {
        $this->loggingService->info("importing airports...");

        $this->loggingService->info("deleting existing airports from db...");
        $this->airportService->deleteAll();
        $this->loggingService->info("done.");
        $airportCount = 0;

        $page = 1;
        do {
            $this->loggingService->info("reading page " . $page . " from openaip...");
            $response = $this->openAipApiService->readAirports($page, $this->importFilter);
            $this->loggingService->info("successfully read page " . $response->page . "/" . $response->totalPages);
            $airportCount += count($response->items);

            $this->loggingService->info("inserting " . count($response->items) . " airports into db...");
            $this->airportService->insertAll($response->items);
            $this->loggingService->info("done.");

            $page = $response->nextPage;
        } while ($page >= 1);

        $this->loggingService->info("successfully imported " . $airportCount . " airports");

        // zoomlevel sorter
        $zoomLevelSorter = new ZoomLevelSorter($this->loggingService);
        $airportSorter = new AirportZoomLevelSortItem($this->dbService);
        $zoomLevelSorter->sort($airportSorter);

        return new ImportResult(true, $airportCount);
    }


    public function importAirspaces(): ImportResult
    {
        $this->loggingService->info("importing airspaces...");

        $this->loggingService->info("deleting existing airspaces from db...");
        $this->airspaceService->deleteAll();
        $this->loggingService->info("done.");
        $airspaceCount = 0;

        $page = 1;
        do {
            $this->loggingService->info("reading page " . $page . " from openaip...");
            $response = $this->openAipApiService->readAirspaces($page, $this->importFilter);
            $this->loggingService->info("successfully read page " . $response->page . "/" . $response->totalPages);
            $airspaceCount += count($response->items);

            $this->loggingService->info("inserting " . count($response->items) . " airspaces into db...");
            $this->airspaceService->insertAll($response->items);
            $this->loggingService->info("done.");

            $page = $response->nextPage;
        } while ($page >= 1);

        $this->loggingService->info("successfully imported " . $airspaceCount . " airspaces");

        $detailLevelCreator = new AirspaceDetaillevelCreator($this->dbService, $this->loggingService);
        $detailLevelCreator->go();

        return new ImportResult(true, $airspaceCount);
    }


    public function importNavaids(): ImportResult
    {
        $this->loggingService->info("importing navaids...");

        $this->loggingService->info("deleting existing navaids from db...");
        $this->navaidService->deleteAll();
        $this->loggingService->info("done.");
        $navaidCount = 0;

        $page = 1;
        do {
            $this->loggingService->info("reading page " . $page . " from openaip...");
            $response = $this->openAipApiService->readNavaids($page, $this->importFilter);
            $this->loggingService->info("successfully read page " . $response->page . "/" . $response->totalPages);
            $navaidCount += count($response->items);

            $this->loggingService->info("inserting " . count($response->items) . " navaids into db...");
            $this->navaidService->insertAll($response->items);
            $this->loggingService->info("done.");

            $page = $response->nextPage;
        } while ($page >= 1);

        $this->loggingService->info("successfully imported " . $navaidCount . " navaids");

        // zoomlevel sorter
        $zoomLevelSorter = new ZoomLevelSorter($this->loggingService);
        $navaidSorter = new NavaidZoomLevelSortItem($this->dbService);
        $zoomLevelSorter->sort($navaidSorter);

        return new ImportResult(true, $navaidCount);
    }
}
