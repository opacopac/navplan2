<?php declare(strict_types=1);

namespace Navplan\OpenAip\Importer\Service;

use Navplan\Enroute\DomainService\IAirspaceService;
use Navplan\Enroute\DomainService\INavaidService;
use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\Importer\Model\ImportResult;


class OpenAipImporter implements IOpenAipImporter {
    public function __construct(
        private IOpenAipService $openAipApiService,
        private IAirspaceService $airspaceService,
        private INavaidService $navaidService,
    ) {
    }


    function importAirspaces(): ImportResult {
        $airspaceCount = 0;
        $this->airspaceService->deleteAll();

        $page = 1;
        do {
            $response = $this->openAipApiService->readAirspaces($page);
            $airspaceCount += count($response->items);

            $this->airspaceService->insert($response->items);
            $page = $response->nextPage;
        } while ($page >= 1);

        return new ImportResult(true, $airspaceCount);
    }


    public function importNavaids(): ImportResult {
        $navaidCount = 0;
        $this->navaidService->deleteAll();

        $page = 1;
        do {
            $response = $this->openAipApiService->readNavaids($page);
            $navaidCount += count($response->items);

            $this->navaidService->insert($response->items);
            $page = $response->nextPage;
        } while ($page >= 1);

        return new ImportResult(true, $navaidCount);
    }
}
