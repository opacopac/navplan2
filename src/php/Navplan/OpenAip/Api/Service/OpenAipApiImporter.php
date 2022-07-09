<?php declare(strict_types=1);

namespace Navplan\OpenAip\Api\Service;

use Exception;
use Navplan\Enroute\DomainService\INavaidService;
use Navplan\OpenAip\Api\Model\OpenAipApiNavaidResponseConverter;
use Navplan\OpenAip\Api\Model\OpenAipNavaidResponse;
use Navplan\OpenAip\Domain\Model\NavaidImportResult;
use Navplan\OpenAip\Domain\Service\IOpenAipConfigService;
use Navplan\OpenAip\Domain\Service\IOpenAipImporter;
use Navplan\System\DomainService\IDbService;


class OpenAipApiImporter implements IOpenAipImporter {
    private const CLIENT_ID_HEADER = 'x-openaip-client-id';
    private const OPEN_AIP_BASE_URL = 'https://api.core.openaip.net/api/';
    private const NAVAIDS_URL_SUFFIX = 'navaids';
    private const MAX_RESULTS_PER_PAGE = 1000;


    public function __construct(
        private IOpenAipConfigService $openAipConfigService,
        private IDbService $dbService,
        private INavaidService $navaidService
    ) {
    }


    public function importNavaids(): NavaidImportResult {
        $context = $this->getHttpContext();

        $navaidCount = 0;
        try {
            $this->dbService->begin_transaction();

            // delete existing navaids from db
            $this->navaidService->deleteAll();

            $page = 1;
            do {
                // load navaids from open aip
                $url = $this->getNavaidUrl($page);
                $response = $this->readNavaidResponse($url, $context);
                $navaidCount += count($response->items);

                // save navaids to db
                $this->navaidService->insert($response->items);
                $page = $response->nextPage;
            } while ($page >= 1);

            $this->dbService->commit();
        } catch (Exception $exception) {
            $this->dbService->rollback();

            throw $exception;
        }

        return new NavaidImportResult(true, $navaidCount);
    }


    private function getHttpContext() {
        $opts = array(
            'http' => array(
                'method' => "GET",
                'header' => self::CLIENT_ID_HEADER . ": " . $this->openAipConfigService->getOpenAipClientIdToken() . "\r\n"
            )
        );

        return stream_context_create($opts);
    }


    private function getNavaidUrl(int $page): string {
        return self::OPEN_AIP_BASE_URL . self::NAVAIDS_URL_SUFFIX .
            "?limit=" . self::MAX_RESULTS_PER_PAGE .
            "&page=" . $page;
    }


    private function readNavaidResponse(string $url, $context): OpenAipNavaidResponse {
        $rawResponse = file_get_contents($url, false, $context);
        $jsonResponse = json_decode($rawResponse, true, JSON_NUMERIC_CHECK);

        return OpenAipApiNavaidResponseConverter::fromRest($jsonResponse);
    }
}
