<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;
use Navplan\MeteoGram\Rest\Model\RestCloudMeteogramConverter;
use Navplan\MeteoGram\Rest\Model\RestReadCloudMeteogramRequestConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class ReadCloudMeteogramController implements IRestController {
    public function __construct(
        private readonly IHttpService $httpService,
        private readonly ICloudMeteoGramService $meteoGramService
    ) {
    }


    public function processRequest(): void {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $args = $this->httpService->getGetArgs();
                $request = RestReadCloudMeteogramRequestConverter::fromRest($args);
                $response = $this->meteoGramService->readCloudMeteoGram($request);
                $this->httpService->sendArrayResponse(RestCloudMeteogramConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
