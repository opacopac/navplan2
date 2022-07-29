<?php declare(strict_types=1);

namespace Navplan\Webcam\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\DomainService\IHttpService;
use Navplan\Webcam\Domain\Service\IWebcamService;
use Navplan\Webcam\Rest\Model\RestWebcamConverter;


class WebcamController {
    const ARG_ACTION = "action";
    const ACTION_GET_WEBCAMS_BY_EXTENT = "getWebcamsByExtent";


    public static function processRequest(
        IWebcamService $webcamService,
        IHttpService $httpService
    ) {
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_WEBCAMS_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $adList = $webcamService->searchByExtent($extent);
                $httpService->sendArrayResponse(RestWebcamConverter::toRestList($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
