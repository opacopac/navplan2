<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\Rest\Model\RestSearchByPositionQueryConverter;
use Navplan\Search\Rest\Model\RestSearchByTextQueryConverter;
use Navplan\Search\Rest\Model\RestSearchResultConverter;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\RestTokenConverter;


class SearchController implements IRestController
{
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";


    public function __construct(
        private ISearchService $searchService,
        private IHttpService   $httpService
    )
    {
    }


    public function processRequest()
    {
        $args = $this->httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());
                $query = RestSearchByTextQueryConverter::fromArgs($args);
                $result = $this->searchService->searchByText($query, $token);
                $this->httpService->sendArrayResponse(RestSearchResultConverter::toRest($result));
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());
                $query = RestSearchByPositionQueryConverter::fromArgs($args);
                $result = $this->searchService->searchByPosition($query, $token);
                $this->httpService->sendArrayResponse(RestSearchResultConverter::toRest($result));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
