<?php declare(strict_types=1);

namespace Navplan\Webcam\RestService;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Webcam\RestModel\RestWebcamConverter;


class WebcamServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_WEBCAMS_BY_EXTENT = "getWebcamsByExtent";


    public static function processRequest(array $args, IWebcamServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_WEBCAMS_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $adList = $diContainer->getWebcamRepo()->searchByExtent($extent);
                $httpService->sendArrayResponse(RestWebcamConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
