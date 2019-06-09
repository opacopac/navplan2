<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexGateway;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\System\UseCase\IFileService;
use Navplan\Traffic\UseCase\IAdsbexGateway;


class AdsbexGateway implements IAdsbexGateway {
    private const API_KEY = '5768a18d-4eaf-4fa5-8e7d-bf07db9307b1';
    private const ADSBEXCHANGE_BASE_URL = 'https://adsbexchange.com/api/aircraft/json/'; // lat/37.16611/lon/-119.44944/dist/10/';

    /* @var $fileService IFileService */
    private $fileService;


    public function __construct(IFileService $fileService) {
        $this->fileService = $fileService;
    }


    public function readTraffic(Position2d $position, Length $radius): array {
        $response = $this->callAdsbexService($position, $radius);

        return $this->parseResponse($response);
    }


    private function callAdsbexService(Position2d $position, Length $radius): string {
        $opts = array(
            "http" => array(
                "method" => "GET",
                "header" => "api-auth: " . self::API_KEY . "\r\n"
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

        for ($i = 0 ; $i < count($responseJson["ac"]); $i++) {
            $trafficList[] = AdsbexTraffic::fromResponse($responseJson, $i);
        }

        return $trafficList;
    }
}
