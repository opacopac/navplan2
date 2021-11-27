<?php declare(strict_types=1);

namespace Navplan\Track\RestService;

use InvalidArgumentException;
use Navplan\Track\RestModel\RestReadTrackListRequest;
use Navplan\Track\RestModel\RestReadTrackListResponseConverter;
use Navplan\Track\RestModel\RestReadTrackRequest;
use Navplan\Track\RestModel\RestReadTrackResponseConverter;


class TrackServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_READ_TRACKLIST = "readtracklist";
    const ACTION_READ_TRACK = "readtrack";


    public static function processRequest(array $postArgs, ITrackServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_READ_TRACKLIST:
                $request = RestReadTrackListRequest::fromRest($postArgs);
                $tracks = $diContainer->getTrackService()->readTrackList($request->token);
                $response = RestReadTrackListResponseConverter::toRest($tracks);
                $httpService->sendArrayResponse($response);
                break;
            case self::ACTION_READ_TRACK:
                $request = RestReadTrackRequest::fromRest($postArgs);
                $tracks = $diContainer->getTrackService()->readTrack($request->trackId, $request->token);
                $response = RestReadTrackResponseConverter::toRest($tracks);
                $httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
