<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Service;

use InvalidArgumentException;
use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\Rest\Model\RestSearchByPositionQueryConverter;
use Navplan\Search\Rest\Model\RestSearchByTextQueryConverter;
use Navplan\Search\Rest\Model\RestSearchResultConverter;
use Navplan\System\Domain\Service\IHttpService;


class SearchController {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";


    public static function processRequest(
        ISearchService $searchService,
        IHttpService $httpService
    ) {
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                $query = RestSearchByTextQueryConverter::fromArgs($args);
                $result = $searchService->searchByText($query);
                $httpService->sendArrayResponse(RestSearchResultConverter::toRest($result));
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $query = RestSearchByPositionQueryConverter::fromArgs($args);
                $result = $searchService->searchByPosition($query);
                $httpService->sendArrayResponse(RestSearchResultConverter::toRest($result));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
