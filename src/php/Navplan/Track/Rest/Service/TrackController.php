<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Service;

use InvalidArgumentException;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Rest\Model\RestReadTrackListRequest;
use Navplan\Track\Rest\Model\RestReadTrackListResponseConverter;
use Navplan\Track\Rest\Model\RestReadTrackRequest;
use Navplan\Track\Rest\Model\RestReadTrackResponseConverter;


class TrackController {
    const ARG_ACTION = "action";
    const ACTION_READ_TRACKLIST = "readtracklist";
    const ACTION_READ_TRACK = "readtrack";


    public static function processRequest(
        IHttpService $httpService,
        ITrackService $trackService
    ) {
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $action = $httpService->getGetArgs()[self::ARG_ACTION] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_TRACKLIST:
                        $request = RestReadTrackListRequest::fromRest($httpService->getGetArgs());
                        $tracks = $trackService->readTrackList($request->token);
                        $response = RestReadTrackListResponseConverter::toRest($tracks);
                        $httpService->sendArrayResponse($response);
                        break;
                    case self::ACTION_READ_TRACK:
                        $request = RestReadTrackRequest::fromRest($httpService->getGetArgs());
                        $tracks = $trackService->readTrack($request->trackId, $request->token);
                        $response = RestReadTrackResponseConverter::toRest($tracks);
                        $httpService->sendArrayResponse($response);
                        break;
                    default:
                        throw new InvalidArgumentException("no or unknown action '" . $action . "'");
                }
                break;
            case HttpRequestMethod::POST:
                // $action = $postArgs[self::ARG_ACTION] ?? NULL;
            default:
                throw new InvalidArgumentException("unknown request method '" . $httpService->getRequestMethod() . "'");
        }
    }
}
