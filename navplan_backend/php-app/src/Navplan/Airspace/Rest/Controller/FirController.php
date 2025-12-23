<?php declare(strict_types=1);

namespace Navplan\Airspace\Rest\Controller;

use InvalidArgumentException;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Airspace\Rest\Converter\RestFirConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


readonly class FirController implements IRestController
{
    public function __construct(
        private IFirService $firService,
        private IHttpService $httpService
    )
    {
    }


    public function processRequest(): void
    {
        $args = $this->httpService->getGetArgs();

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if (!isset($args["icao"])) { // TODO: move into constant
                    throw new InvalidArgumentException("missing required parameter: icao");
                }

                $icao = strtoupper(trim($args["icao"]));
                $fir = $this->firService->readByIcao($icao);

                $response = $fir !== null ? RestFirConverter::toRest($fir) : null;
                $this->httpService->sendArrayResponse($response);
                break;

            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
