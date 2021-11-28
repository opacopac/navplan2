<?php declare(strict_types=1);

namespace Navplan\Track\RestService;

use InvalidArgumentException;
use Navplan\Track\RestModel\RestReadTrackListRequest;
use Navplan\Track\RestModel\RestReadTrackListResponseConverter;
use Navplan\Track\RestModel\RestReadTrackRequest;
use Navplan\Track\RestModel\RestReadTrackResponseConverter;


class TrackServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";
    const ARG_ACTION = "action";
    const ACTION_READ_TRACKLIST = "readtracklist";
    const ACTION_READ_TRACK = "readtrack";


    public static function processRequest(ITrackServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();

        switch ($httpService->getRequestMethod()) {
            case self::REQ_METHOD_GET:
                $action = $httpService->getGetArgs()[self::ARG_ACTION] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_TRACKLIST:
                        $request = RestReadTrackListRequest::fromRest($httpService->getGetArgs());
                        $tracks = $diContainer->getTrackService()->readTrackList($request->token);
                        $response = RestReadTrackListResponseConverter::toRest($tracks);
                        $httpService->sendArrayResponse($response);
                        break;
                    case self::ACTION_READ_TRACK:
                        $request = RestReadTrackRequest::fromRest($httpService->getGetArgs());
                        $tracks = $diContainer->getTrackService()->readTrack($request->trackId, $request->token);
                        $response = RestReadTrackResponseConverter::toRest($tracks);
                        $httpService->sendArrayResponse($response);
                        break;
                    default:
                        throw new InvalidArgumentException("no or unknown action '" . $action . "'");
                }
                break;
            case self::REQ_METHOD_POST:
                // $action = $postArgs[self::ARG_ACTION] ?? NULL;
            default:
                throw new InvalidArgumentException("unknown request method '" . $httpService->getRequestMethod() . "'");
        }
    }
}
