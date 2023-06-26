<?php declare(strict_types=1);

namespace Navplan\Traffic\Adsbex\Service;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\Traffic\Adsbex\Model\AdsbexTrafficConverter;
use Navplan\Traffic\Domain\Service\IAdsbexService;


class AdsbexService implements IAdsbexService {
    private const ADSBEXCHANGE_BASE_URL = 'https://adsbexchange.com/api/aircraft/v2/'; // lat/37.16611/lon/-119.44944/dist/10/';


    public function __construct(
        private readonly IFileService $fileService,
        private readonly ITimeService $timeService,
        private readonly IAdsbexConfig $adsbexConfig
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
                "header" => "api-auth: " . $this->adsbexConfig->getAdsbExchangeApiKey() . "\r\n",
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
