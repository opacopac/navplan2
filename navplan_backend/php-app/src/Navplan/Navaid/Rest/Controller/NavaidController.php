<?php declare(strict_types=1);

namespace Navplan\Navaid\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\Common\Rest\Converter\RestZoomConverter;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Navaid\Rest\Converter\RestNavaidConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class NavaidController implements IRestController
{
    public function __construct(
        private INavaidService $navaidService,
        private IHttpService $httpService
    )
    {
    }


    public function processRequest()
    {
        $args = $this->httpService->getGetArgs();
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = RestZoomConverter::fromArgs($args);
                $navaidList = $this->navaidService->searchByExtent($extent, $zoom);
                $response = RestNavaidConverter::toRestList($navaidList);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("invalid request");
        }
    }
}
