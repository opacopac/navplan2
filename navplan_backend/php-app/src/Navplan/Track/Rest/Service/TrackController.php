<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestActionConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\Rest\Converter\RestExportFileConverter;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Rest\Model\RestReadTrackListResponseConverter;
use Navplan\Track\Rest\Model\RestReadTrackResponseConverter;
use Navplan\Track\Rest\Model\RestTrackConverter;
use Navplan\Track\Rest\Model\RestTrackRequest;
use Navplan\User\Rest\Model\RestTokenConverter;


class TrackController implements IRestController
{
    const ARG_ACTION_KML_EXPORT = "exportkml";

    public function __construct(
        private readonly IHttpService $httpService,
        private readonly ITrackService $trackService,
        private readonly IExportService $exportService
    )
    {
    }


    public function processRequest(): void
    {
        $id = RestIdConverter::getIdOrNull($this->httpService->getGetArgs());
        $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $action = RestActionConverter::getActionOrNull($this->httpService->getGetArgs());

                if ($id) {
                    $request = $this->trackService->readTrack($id, $token);
                    switch ($action) {
                        case self::ARG_ACTION_KML_EXPORT:
                            $exportFile = $this->exportService->createNavplanKml(null, $request);
                            $response = RestExportFileConverter::toRest($exportFile);
                            break;
                        default:
                            $response = RestReadTrackResponseConverter::toRest($request);
                            break;
                    }
                } else {
                    $tracks = $this->trackService->readTrackList($token);
                    $response = RestReadTrackListResponseConverter::toRest($tracks);
                }
                break;
            case HttpRequestMethod::POST:
                $args = $this->httpService->getPostArgs();
                $request = RestTrackRequest::fromRest($args);
                $savedTrack = $this->trackService->createTrack($request->track, $token);
                $response = RestReadTrackResponseConverter::toRest($savedTrack);
                break;
            case HttpRequestMethod::PUT:
                $args = $this->httpService->getPostArgs();
                $request = RestTrackRequest::fromRest($args, $id);
                $savedTrack = $this->trackService->updateTrack($request->track, $token);
                $response = RestReadTrackResponseConverter::toRest($savedTrack);
                break;
            case HttpRequestMethod::DELETE:
                $success = $this->trackService->deleteTrack($id, $token);
                $response = RestSuccessResponse::toRest($success);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }

        $this->httpService->sendArrayResponse($response);
    }
}
