<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;
use Navplan\MeteoRadar\Rest\Model\RestRadarImageConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class MeteoRadarImageController implements IRestController
{
    public function __construct(
        private readonly IMeteoRadarImagesRepo $radarService,
        private readonly IHttpService $httpService
    )
    {
    }


    public function processRequest(): void
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $availableRadarImages = $this->radarService->readAvailableRadarImages();
                $response = RestRadarImageConverter::toRestList($availableRadarImages);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
