<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aircraft\Domain\Service\IAircraftTypeDesignatorService;
use Navplan\Aircraft\Rest\Converter\RestSearchAircraftTypeDesignatorRequest;
use Navplan\Aircraft\Rest\Converter\RestSearchAircraftTypeDesignatorResponse;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AircraftTypeDesignatorController implements IRestController
{
    public function __construct(
        private IAircraftTypeDesignatorService $acTypeDesignatorService,
        private IHttpService $httpService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($this->httpService->hasGetArg(RestSearchAircraftTypeDesignatorRequest::ARG_QUERY)) {
                    $request = RestSearchAircraftTypeDesignatorRequest::fromRest($this->httpService->getGetArgs());
                    $acTypeDesignatorList = $this->acTypeDesignatorService->searchByText($request->query);
                    $response = new RestSearchAircraftTypeDesignatorResponse($acTypeDesignatorList);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    throw new InvalidArgumentException('unknown request');
                }
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
