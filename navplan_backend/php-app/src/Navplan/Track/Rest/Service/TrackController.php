<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Rest\Model\RestReadTrackListResponseConverter;
use Navplan\Track\Rest\Model\RestReadTrackResponseConverter;
use Navplan\User\Rest\Model\RestTokenConverter;


class TrackController implements IRestController
{
    public function __construct(
        private readonly IHttpService $httpService,
        private readonly ITrackService $trackService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $id = RestIdConverter::getIdOrNull($this->httpService->getGetArgs());
                $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());

                if ($id) {
                    $tracks = $this->trackService->readTrack($id, $token);
                    $response = RestReadTrackResponseConverter::toRest($tracks);
                } else {
                    $tracks = $this->trackService->readTrackList($token);
                    $response = RestReadTrackListResponseConverter::toRest($tracks);
                }
                $this->httpService->sendArrayResponse($response);
                break;
            case HttpRequestMethod::DELETE:
                $id = RestIdConverter::getId($this->httpService->getGetArgs());
                $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());
                $success = $this->trackService->deleteTrack($id, $token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
