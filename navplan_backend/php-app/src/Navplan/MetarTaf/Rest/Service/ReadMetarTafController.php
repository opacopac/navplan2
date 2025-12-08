<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MetarTaf\Domain\Service\IMetarTafService;
use Navplan\MetarTaf\Rest\Model\RestMetarTafResponseConverter;
use Navplan\MetarTaf\Rest\Model\RestReadMetarTafRequestConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


readonly class ReadMetarTafController implements IRestController {
    public function __construct(
        private IHttpService $httpService,
        private IMetarTafService $metarTafService
    ) {
    }


    public function processRequest(): void {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $args = $this->httpService->getGetArgs();
                $request = RestReadMetarTafRequestConverter::fromRest($args);
                $response = $this->metarTafService->readMetarTaf($request);
                $this->httpService->sendArrayResponse(RestMetarTafResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
