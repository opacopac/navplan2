<?php declare(strict_types=1);

namespace Navplan\Webcam\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Webcam\Domain\Service\IWebcamService;
use Navplan\Webcam\Rest\Model\RestWebcamConverter;


class WebcamController
{
    public static function processRequest(
        IWebcamService $webcamService,
        IHttpService $httpService
    )
    {
        $args = $httpService->getGetArgs();
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $extent = RestExtent2dConverter::fromArgs($args);
                $webcams = $webcamService->searchByExtent($extent);
                $response = RestWebcamConverter::toRestList($webcams);
                $httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("invalid request");
        }
    }
}
