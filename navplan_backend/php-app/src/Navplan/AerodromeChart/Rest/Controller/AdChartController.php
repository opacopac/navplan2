<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Service\IAirportChartRepo;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Rest\Converter\RestAirportChart2Converter;
use Navplan\AerodromeChart\Rest\Converter\RestUploadedChartInfoConverter;
use Navplan\AerodromeChart\Rest\Converter\RestUploadedPdfInfoConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestActionConverter;
use Navplan\Common\Rest\Converter\RestFileConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\RestTokenConverter;


class AdChartController implements IRestController
{
    const ARG_ACTION_UPLOAD = "upload";
    const ARG_ACTION_SAVE = "save";
    const ARG_AD_ID = "adid";
    const ARG_FILE = "file";


    public function __construct(
        private IHttpService         $httpService,
        private IAirportChartService $airportChartService,
        private IAirportChartRepo    $airportChartRepo,
    )
    {
    }


    public function processRequest()
    {
        $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $id = RestIdConverter::getId($this->httpService->getGetArgs());
                $adChart = $this->airportChartRepo->getAdChart2ById($id);
                $response = RestAirportChart2Converter::toRest($adChart);
                break;
            case HttpRequestMethod::POST:
                $adid = RestIdConverter::getId($this->httpService->getGetArgs(), self::ARG_AD_ID);
                $action = RestActionConverter::getAction($this->httpService->getGetArgs());

                if ($action === self::ARG_ACTION_UPLOAD) {
                    $fileInfo = RestFileConverter::getUploadedFileInfo($this->httpService->getFileArgs(), self::ARG_FILE);
                    $pdfInfo = RestUploadedPdfInfoConverter::fromRest($this->httpService->getPostArgs());
                    $chartInfo = $this->airportChartService->uploadAdChart($fileInfo, $pdfInfo);
                    $response = RestUploadedChartInfoConverter::toRest($chartInfo);
                } elseif ($action === self::ARG_ACTION_SAVE) {
                    // TODO
                } else {
                    throw new InvalidArgumentException("invalid arguments");
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request method");
        }

        $this->httpService->sendArrayResponse($response);
    }
}
