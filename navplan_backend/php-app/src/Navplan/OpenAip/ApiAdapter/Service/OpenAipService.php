<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;

use Navplan\OpenAip\ApiAdapter\Model\OpenAipAirportResponseConverter;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipAirspaceResponseConverter;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipNavaidResponseConverter;
use Navplan\OpenAip\Config\IOpenAipConfig;


class OpenAipService implements IOpenAipService {
    private const CLIENT_ID_HEADER = 'x-openaip-api-key';
    private const OPEN_AIP_BASE_URL = 'https://api.core.openaip.net/api/'; // TODO: config
    private const AIRPORTS_URL_SUFFIX = 'airports';
    private const AIRSPACES_URL_SUFFIX = 'airspaces';
    private const NAVAIDS_URL_SUFFIX = 'navaids';
    private const MAX_RESULTS_PER_PAGE = 1000;


    public function __construct(
        private readonly IOpenAipConfig $openAipConfig,
    ) {
    }


    public function readAirports(int $page = 1, OpenAipImportFilter $importFilter = null): OpenAipReadAirportResponse {
        $url = $this->buildUrl(self::AIRPORTS_URL_SUFFIX, $page, $importFilter);
        $context = $this->getHttpContext();
        $rawResponse = file_get_contents($url, false, $context);
        $jsonResponse = json_decode($rawResponse, true, JSON_NUMERIC_CHECK);

        return OpenAipAirportResponseConverter::fromRest($jsonResponse);
    }


    public function readAirspaces(int $page = 1, OpenAipImportFilter $importFilter = null): OpenAipReadAirspacesResponse {
        $url = $this->buildUrl(self::AIRSPACES_URL_SUFFIX, $page, $importFilter);
        $context = $this->getHttpContext();
        $rawResponse = file_get_contents($url, false, $context);
        $jsonResponse = json_decode($rawResponse, true, JSON_NUMERIC_CHECK);

        return OpenAipAirspaceResponseConverter::fromRest($jsonResponse);
    }


    public function readNavaids(int $page = 1, OpenAipImportFilter $importFilter = null): OpenAipReadNavaidsResponse {
        $url = $this->buildUrl(self::NAVAIDS_URL_SUFFIX, $page, $importFilter);
        $context = $this->getHttpContext();
        $rawResponse = file_get_contents($url, false, $context);
        $jsonResponse = json_decode($rawResponse, true, JSON_NUMERIC_CHECK);

        return OpenAipNavaidResponseConverter::fromRest($jsonResponse);
    }


    private function buildUrl(string $urlSuffix, int $page, OpenAipImportFilter $importFilter = null) {
        $url = self::OPEN_AIP_BASE_URL . $urlSuffix . "?limit=" . self::MAX_RESULTS_PER_PAGE . "&page=" . $page;

        if ($importFilter != null) {
            if ($importFilter->country != null) {
                $url .= "&country=" . $importFilter->country;
            }
        }

        return $url;
    }


    private function getHttpContext() {
        $opts = array(
            'http' => array(
                'method' => "GET",
                'header' => self::CLIENT_ID_HEADER . ": " . $this->openAipConfig->getOpenAipClientIdToken() . "\r\n"
            )
        );

        return stream_context_create($opts);
    }
}
