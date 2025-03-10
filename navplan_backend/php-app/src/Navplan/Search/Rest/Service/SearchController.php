<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\Rest\Model\RestSearchByPositionQueryConverter;
use Navplan\Search\Rest\Model\RestSearchByTextQueryConverter;
use Navplan\Search\Rest\Model\RestSearchResultConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\RestTokenConverter;


class SearchController implements IRestController
{
    const ACTION_SEARCH_BY_TEXT = "text";
    const ACTION_SEARCH_BY_POSITION = "position";


    public function __construct(
        private ISearchService $searchService,
        private IHttpService   $httpService
    )
    {
    }


    public function processRequest()
    {
        $args = $this->httpService->getGetArgs();
        $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());
        $path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
        $action = basename($path);

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($action === self::ACTION_SEARCH_BY_TEXT) {
                    $query = RestSearchByTextQueryConverter::fromArgs($args);
                    $result = $this->searchService->searchByText($query, $token);
                    $response = RestSearchResultConverter::toRest($result);
                    $this->httpService->sendArrayResponse($response);
                } else if ($action === self::ACTION_SEARCH_BY_POSITION) {
                    $query = RestSearchByPositionQueryConverter::fromArgs($args);
                    $result = $this->searchService->searchByPosition($query, $token);
                    $response = RestSearchResultConverter::toRest($result);
                    $this->httpService->sendArrayResponse($response);
                } else {
                    throw new InvalidArgumentException("invalid request");
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request method");
        }
    }
}
