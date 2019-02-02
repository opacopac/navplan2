<?php declare(strict_types=1);

namespace Navplan\Traffic;
use Navplan\Shared\StringNumberService;


class ReadAdsbexTraffic {
    private const API_KEY = '5768a18d-4eaf-4fa5-8e7d-bf07db9307b1';
    private const ADSBEXCHANGE_BASE_URL = 'https://adsbexchange.com/api/aircraft/json/'; // lat/37.16611/lon/-119.44944/dist/10/';


    /***
     * @param array $args
     * @throws \Navplan\Shared\InvalidFormatException
     */
    public static function readTraffic(array $args) {
        $lat = StringNumberService::checkNumeric($args["lat"]);
        $lon = StringNumberService::checkNumeric($args["lon"]);
        $dist = StringNumberService::checkNumeric($args["dist"]);
        $callback = StringNumberService::checkString($args["callback"], 1, 50);

        $opts = array(
            'http'=>array(
                'method'=>"GET",
                'header'=>"api-auth: " . self::API_KEY . "\r\n"
            )
        );
        $context = stream_context_create($opts);

        $url = self::ADSBEXCHANGE_BASE_URL . 'lat/' . $lat . '/lon/' . $lon . '/dist/' . $dist . '/';
        $adsbexResponse = file_get_contents($url, false, $context);

        self::sendResponse($adsbexResponse, $callback);
    }


    private static function sendResponse(string $adsbexResponse, string $callback)
    {
        echo $callback . "(";
        echo $adsbexResponse;
        echo ")";
    }
}
