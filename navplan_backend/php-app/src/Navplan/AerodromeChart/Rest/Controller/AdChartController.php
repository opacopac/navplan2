<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Rest\Converter\RestAirportChartConverter;
use Navplan\AerodromeChart\Rest\Converter\RestChartSaveParametersConverter;
use Navplan\AerodromeChart\Rest\Converter\RestPdfParametersConverter;
use Navplan\AerodromeChart\Rest\Converter\RestUploadedChartInfoConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestActionConverter;
use Navplan\Common\Rest\Converter\RestFileConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\RestTokenConverter;


class AdChartController implements IRestController
{
    const ARG_ACTION_UPLOAD = "upload";
    const ARG_ACTION_SAVE = "save";
    const ARG_AD_ICAO = "adicao";
    const ARG_FILE = "file";


    public function __construct(
        private readonly IHttpService $httpService,
        private readonly IAirportChartService $airportChartService
    )
    {
    }


    public function processRequest(): void
    {
        $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $id = RestIdConverter::getId($this->httpService->getGetArgs());
                $adChart = $this->airportChartService->readById($id, $token);
                $response = RestAirportChartConverter::toRest($adChart);
                break;
            case HttpRequestMethod::POST:
                $adIcao = StringNumberHelper::parseStringOrError($this->httpService->getGetArgs(), self::ARG_AD_ICAO);
                $action = RestActionConverter::getAction($this->httpService->getGetArgs());
                switch ($action) {
                    case self::ARG_ACTION_UPLOAD:
                        $fileInfo = RestFileConverter::getUploadedFileInfo($this->httpService->getFileArgs(), self::ARG_FILE);
                        $pdfInfo = RestPdfParametersConverter::fromRest($this->httpService->getPostArgs());
                        $chartInfo = $this->airportChartService->uploadAdChart($fileInfo, $pdfInfo);
                        $response = RestUploadedChartInfoConverter::toRest($chartInfo);
                        break;
                    case self::ARG_ACTION_SAVE:
                        $chartSaveParams = RestChartSaveParametersConverter::fromRest($this->httpService->getPostArgs());
                        $savedAdChart = $this->airportChartService->reprojectAndSaveAdChart($adIcao, $chartSaveParams, $token);
                        $response = RestAirportChartConverter::toRest($savedAdChart);
                        break;
                    default:
                        throw new InvalidArgumentException("invalid arguments");
                }
                break;
            case HttpRequestMethod::DELETE:
                $id = RestIdConverter::getId($this->httpService->getGetArgs());
                $success = $this->airportChartService->deleteAdChart($id, $token);
                $response = RestSuccessResponse::toRest($success);
                break;
            default:
                throw new InvalidArgumentException("invalid request method");
        }

        $this->httpService->sendArrayResponse($response);
    }
}
