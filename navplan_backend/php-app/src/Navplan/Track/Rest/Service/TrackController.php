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


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $id = RestIdConverter::getIdOrNull($this->httpService->getGetArgs());
                $action = RestActionConverter::getActionOrNull($this->httpService->getGetArgs());
                $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());

                if ($id) {
                    switch ($action) {
                        case self::ARG_ACTION_KML_EXPORT:
                            $track = $this->trackService->readTrack($id, $token);
                            $exportFile = $this->exportService->createNavplanKml(null, $track);
                            $response = RestExportFileConverter::toRest($exportFile);
                            break;
                        default:
                            $track = $this->trackService->readTrack($id, $token);
                            $response = RestReadTrackResponseConverter::toRest($track);
                            break;
                    }
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
