<?php declare(strict_types=1);

namespace Navplan\Webcam\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Rest\Model\RestWebcamConverter;


class WebcamController implements IRestController
{
    public function __construct(
        private readonly IWebcamByExtentQuery $webcamByExtentQuery,
        private readonly IHttpService $httpService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $args = $this->httpService->getGetArgs();
                $extent = RestExtent2dConverter::fromArgs($args);
                $webcams = $this->webcamByExtentQuery->search($extent);
                $response = RestWebcamConverter::toRestList($webcams);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
