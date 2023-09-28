<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Service;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;
use Navplan\MeteoGram\Rest\Model\RestCloudMeteogramConverter;
use Navplan\MeteoGram\Rest\Model\RestReadCloudMeteogramRequestConverter;
use Navplan\System\Domain\Service\IHttpService;


class ReadCloudMeteogramController implements IRestController {
    public function __construct(
        private readonly IHttpService $httpService,
        private readonly ICloudMeteoGramService $meteoGramService
    ) {
    }


    public function processRequest(): void {
        $args = $this->httpService->getGetArgs();
        $request = RestReadCloudMeteogramRequestConverter::fromRest($args);
        $response = $this->meteoGramService->readCloudMeteoGram($request);
        $this->httpService->sendArrayResponse(RestCloudMeteogramConverter::toRest($response));
    }
}
