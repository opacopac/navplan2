<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Rest\Model\RestReadTrackListResponseConverter;
use Navplan\Track\Rest\Model\RestReadTrackResponseConverter;
use Navplan\User\Rest\Model\RestTokenConverter;


class TrackController
{
    public static function processRequest(
        IHttpService  $httpService,
        ITrackService $trackService
    )
    {
        $id = RestIdConverter::getIdOrNull($httpService->getGetArgs());
        $token = RestTokenConverter::getTokenOrNull($httpService->getCookies());

        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($id) {
                    $tracks = $trackService->readTrack($id, $token);
                    $response = RestReadTrackResponseConverter::toRest($tracks);
                } else {
                    $tracks = $trackService->readTrackList($token);
                    $response = RestReadTrackListResponseConverter::toRest($tracks);
                }
                $httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("invalid request method");
        }
    }
}
