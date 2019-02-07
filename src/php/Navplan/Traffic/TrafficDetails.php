<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Shared\IDbService;
use Navplan\Shared\InvalidFormatException;
use Navplan\Shared\StringNumberService;


class TrafficDetails {
    /**
     * @param array $args
     * @param IDbService $dbService
     * @throws InvalidFormatException
     */
    public static function getDetails(array $args, IDbService $dbService) {
        $response = [];
        foreach ($args as $ac) {
            self::parseCheckInput($ac);
        }

        $callback = $args["callback"] ? StringNumberService::checkString($args["callback"], 1, 50) : NULL;
        self::sendResponse($response, $callback);
    }


    /**
     * @param array $ac
     * @return array
     * @throws InvalidFormatException
     */
    private static function parseCheckInput(array $ac): array {
        throw new InvalidFormatException('TODO');
    }


    private static function sendResponse(array $acDetails, ?string $callback) {
        $json = json_encode(array("acdetails" => $acDetails), JSON_NUMERIC_CHECK);

        if ($callback !== NULL) {
            echo $callback . "(";
            echo $json;
            echo ")";
        } else {
            echo $json;
        }
    }
}
