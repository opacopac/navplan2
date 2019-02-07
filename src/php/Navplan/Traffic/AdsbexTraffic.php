<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Shared\IFileService;
use Navplan\Shared\StringNumberService;


class AdsbexTraffic {
    private const API_KEY = '5768a18d-4eaf-4fa5-8e7d-bf07db9307b1';
    private const ADSBEXCHANGE_BASE_URL = 'https://adsbexchange.com/api/aircraft/json/'; // lat/37.16611/lon/-119.44944/dist/10/';


    /***
     * @param array $args
     * @param IFileService $fileService
     * @throws \Navplan\Shared\InvalidFormatException
     */
    public static function readTraffic(array $args, IFileService $fileService) {
        $lat = StringNumberService::checkNumeric($args["lat"]);
        $lon = StringNumberService::checkNumeric($args["lon"]);
        $dist = StringNumberService::checkNumeric($args["dist"]);
        $callback = $args["callback"] ? StringNumberService::checkString($args["callback"], 1, 50) : NULL;

        $opts = array(
            'http'=>array(
                'method'=>"GET",
                'header'=>"api-auth: " . self::API_KEY . "\r\n"
            )
        );
        $context = stream_context_create($opts);

        $url = self::ADSBEXCHANGE_BASE_URL . 'lat/' . $lat . '/lon/' . $lon . '/dist/' . $dist . '/';
        $adsbexResponse = $fileService->fileGetContents($url, false, $context);

        self::sendResponse($adsbexResponse, $callback);
    }


    private static function sendResponse(string $adsbexResponse, ?string $callback)
    {
        if ($callback !== NULL) {
            echo $callback . "(";
            echo $adsbexResponse;
            echo ")";
        } else {
            echo $adsbexResponse;
        }
    }
}
