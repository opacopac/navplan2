<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Domain\Service;

use Navplan\MetarTaf\Domain\Model\MetarTafResponse;
use RuntimeException;


class MetarTafService implements IMetarTafService {
    private const API_URL = "https://aviationweather.gov/api/data/metar";
    private const TIMEOUT = 10;


    public function readMetarTaf(ReadMetarTafRequest $request): MetarTafResponse {
        $bbox = urlencode($this->extentToBboxString($request->extent));
        $apiUrl = self::API_URL . "?format=json&taf=true&bbox=" . $bbox;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, self::TIMEOUT);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 204) {
            // No Content - return empty array
            return new MetarTafResponse([]);
        }

        if ($httpCode !== 200 || $response === false) {
            throw new RuntimeException("Failed to fetch METAR/TAF data from Aviation Weather API");
        }

        $data = json_decode($response, true);
        if ($data === null) {
            throw new RuntimeException("Failed to decode METAR/TAF response");
        }

        return new MetarTafResponse($data);
    }


    private function extentToBboxString($extent): string {
        return $extent->minPos->longitude . ',' . $extent->minPos->latitude . ',' . $extent->maxPos->longitude . ',' . $extent->maxPos->latitude;
    }
}
