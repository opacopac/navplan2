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
    private const string ARG_ICAO = "icao";


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
                if (!isset($args[self::ARG_ICAO])) {
                    throw new InvalidArgumentException("missing required parameter: " . self::ARG_ICAO);
                }

                $icaoParam = strtoupper(trim($args[self::ARG_ICAO]));

                // Check if multiple ICAOs are provided (comma-separated)
                if (str_contains($icaoParam, ',')) {
                    $icaos = array_map('trim', explode(',', $icaoParam));
                    $icaos = array_filter($icaos, fn($icao) => !empty($icao)); // Remove empty values

                    $firs = $this->firService->readByIcaos($icaos);
                    $response = RestFirConverter::toRestList($firs);
                } else {
                    $fir = $this->firService->readByIcao($icaoParam);
                    $response = $fir !== null ? RestFirConverter::toRest($fir) : null;
                }

                $this->httpService->sendArrayResponse($response);
                break;

            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
