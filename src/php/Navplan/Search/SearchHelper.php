<?php declare(strict_types=1);

namespace Navplan\Search;

use InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\Shared\StringNumberService;


class SearchHelper
{
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;


    // TODO: escape
    public static function checkEscapeSearchItems(IDbService $dbService, ?string $searchItemString): array {
        if (!$searchItemString) {
            throw new InvalidArgumentException("search items not specified");
        }

        $searchItems = explode(',', $searchItemString);
        foreach ($searchItems as $item) {
            StringNumberService::checkEscapeAlphaNumeric($dbService, $item, 1, 20);
        }

        return $searchItems;
    }


    // TODO: escape
    public static function checkEscapeIcaoList(IDbService $dbService, ?string $icaoString): array {
        if (!$icaoString) {
            throw new InvalidArgumentException("icao list not specified");
        }

        $icaoList = explode(",", $icaoString);
        foreach ($icaoList as $icao) {
            StringNumberService::checkEscapeAlphaNumeric($dbService, $icao, 4, 4);
        }

        return $icaoList;
    }


    public static function sendSearchResultResponse(array $searchResults, IHttpResponseService $httpService) {
        $callback = $_GET["callback"] ? StringNumberService::checkAlphaNumeric($_GET["callback"], 1, 50) : NULL;

        RequestResponseHelper::sendArrayResponse($searchResults, $callback, TRUE);
    }
}
