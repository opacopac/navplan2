<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexService;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\AdsbexModel\AdsbexTrafficConverter;
use Navplan\Traffic\DomainService\IAdsbexService;


class AdsbexService implements IAdsbexService {
    private const API_KEY = '5768a18d-4eaf-4fa5-8e7d-bf07db9307b1';
    private const ADSBEXCHANGE_BASE_URL = 'https://adsbexchange.com/api/aircraft/v2/'; // lat/37.16611/lon/-119.44944/dist/10/';


    public function __construct(
        private IFileService $fileService,
        private ITimeService $timeService
    ) {
    }


    public function readTraffic(Position2d $position, Length $radius): array {
        $response = $this->callAdsbexService($position, $radius);

        return $this->parseResponse($response);
    }


    private function callAdsbexService(Position2d $position, Length $radius): string {
        $opts = array(
            "http" => array(
                "method" => "GET",
                "header" => "api-auth: " . self::API_KEY . "\r\n",
            )
        );
        $context = stream_context_create($opts);

        $dist = $radius->getValue(LengthUnit::NM);
        $url = self::ADSBEXCHANGE_BASE_URL . 'lat/' . $position->latitude . '/lon/' . $position->longitude . '/dist/' . $dist . '/';

        return $this->fileService->fileGetContents($url, false, $context);
    }


    private function parseResponse(string $response): array {
        $responseJson = json_decode($response, true);

        $trafficList = [];

        if (isset($responseJson["ac"])) {
            for ($i = 0; $i < count($responseJson["ac"]); $i++) {
                $trafficList[] = AdsbexTrafficConverter::fromResponse($responseJson, $i, $this->timeService);
            }
        }

        return $trafficList;
    }
}
