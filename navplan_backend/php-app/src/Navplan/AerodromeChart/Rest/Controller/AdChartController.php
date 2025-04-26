<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Service\IAirportChartRepo;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Rest\Converter\RestAirportChart2Converter;
use Navplan\AerodromeChart\Rest\Converter\RestUploadedChartInfoConverter;
use Navplan\AerodromeChart\Rest\Converter\RestUploadedPdfInfoConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestFileConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AdChartController implements IRestController
{
    const ARG_FILE = "file";


    public function __construct(
        private IHttpService $httpService,
        private IAirportChartService $airportChartService,
        private IAirportChartRepo $airportChartRepo,
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $id = RestIdConverter::getId($this->httpService->getGetArgs());
                $adChart = $this->airportChartRepo->getAdChart2ById($id);
                $response = RestAirportChart2Converter::toRest($adChart);
                $this->httpService->sendArrayResponse($response);
                break;
            case HttpRequestMethod::POST:
                $fileInfo = RestFileConverter::getUploadedFileInfo($this->httpService->getFileArgs(), self::ARG_FILE);
                $pdfInfo = RestUploadedPdfInfoConverter::fromRest($this->httpService->getPostArgs());
                $chartInfo = $this->airportChartService->uploadAdChart($fileInfo, $pdfInfo);
                $response = RestUploadedChartInfoConverter::toRest($chartInfo);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
