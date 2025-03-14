<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\StringNumberHelper;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\Rest\Converter\RestExportExcelRequest;
use Navplan\Exporter\Rest\Converter\RestExportFileConverter;
use Navplan\Exporter\Rest\Converter\RestExportFplRequest;
use Navplan\Exporter\Rest\Converter\RestExportGpxRequest;
use Navplan\Exporter\Rest\Converter\RestExportKmlRequest;
use Navplan\Exporter\Rest\Converter\RestExportPdfRequest;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class ExporterController implements IRestController
{
    const ARG_ACTION = "action";
    const ACTION_EXPORT_PDF = "pdf";
    const ACTION_EXPORT_EXCEL = "excel";
    const ACTION_EXPORT_KML = "kml";
    const ACTION_EXPORT_GPX = "gpx";
    const ACTION_EXPORT_FPL = "fpl";


    public function __construct(
        private IExportService $exportService,
        private IHttpService   $httpService
    )
    {
    }


    public function processRequest()
    {
        $action = StringNumberHelper::parseStringOrError($this->httpService->getGetArgs(), self::ARG_ACTION);

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::POST:
                $postArgs = $this->httpService->getPostArgs();

                switch ($action) {
                    case self::ACTION_EXPORT_PDF:
                        $request = RestExportPdfRequest::fromRest($postArgs);
                        $exportFile = $this->exportService->createNavplanPdf($request->flightroute, $request->fuelCalc);
                        break;
                    case self::ACTION_EXPORT_EXCEL:
                        $request = RestExportExcelRequest::fromRest($postArgs);
                        $exportFile = $this->exportService->createNavplanExcel($request->flightroute, $request->fuelCalc);
                        break;
                    case self::ACTION_EXPORT_KML:
                        $request = RestExportKmlRequest::fromRest($postArgs);
                        $exportFile = $this->exportService->createNavplanKml($request->flightroute, $request->track);
                        break;
                    case self::ACTION_EXPORT_GPX:
                        $request = RestExportGpxRequest::fromRest($postArgs);
                        $exportFile = $this->exportService->createNavplanGpx($request->flightroute, $request->track);
                        break;
                    case self::ACTION_EXPORT_FPL:
                        $request = RestExportFplRequest::fromRest($postArgs);
                        $exportFile = $this->exportService->createNavplanFpl($request->flightroute);
                        break;
                    default:
                        throw new InvalidArgumentException("unsupported action for POST request");
                }
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }

        $response = RestExportFileConverter::toRest($exportFile);
        $this->httpService->sendArrayResponse($response);
    }
}
