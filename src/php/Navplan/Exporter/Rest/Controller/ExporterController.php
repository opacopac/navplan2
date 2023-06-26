<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\Rest\Converter\RestExportExcelRequest;
use Navplan\Exporter\Rest\Converter\RestExportFileConverter;
use Navplan\Exporter\Rest\Converter\RestExportFplRequest;
use Navplan\Exporter\Rest\Converter\RestExportGpxRequest;
use Navplan\Exporter\Rest\Converter\RestExportKmlRequest;
use Navplan\Exporter\Rest\Converter\RestExportPdfRequest;
use Navplan\System\Domain\Service\IHttpService;


class ExporterController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_EXPORT_PDF = "exportpdf";
    const ACTION_EXPORT_EXCEL = "exportexcel";
    const ACTION_EXPORT_KML = "exportkml";
    const ACTION_EXPORT_GPX = "exportgpx";
    const ACTION_EXPORT_FPL = "exportfpl";


    public function __construct(
        private IExportService $exportService,
        private IHttpService $httpService
    ) {
    }


    public function processRequest() {
        $postArgs = $this->httpService->getPostArgs();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_EXPORT_PDF:
                $request = RestExportPdfRequest::fromRest($postArgs);
                $exportFile = $this->exportService->createNavplanPdf($request->flightroute, $request->fuelCalc);
                $this->httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_EXCEL:
                $request = RestExportExcelRequest::fromRest($postArgs);
                $exportFile = $this->exportService->createNavplanExcel($request->flightroute, $request->fuelCalc);
                $this->httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_KML:
                $request = RestExportKmlRequest::fromRest($postArgs);
                $exportFile = $this->exportService->createNavplanKml($request->flightroute, $request->track);
                $this->httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_GPX:
                $request = RestExportGpxRequest::fromRest($postArgs);
                $exportFile = $this->exportService->createNavplanGpx($request->flightroute, $request->track);
                $this->httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_FPL:
                $request = RestExportFplRequest::fromRest($postArgs);
                $exportFile = $this->exportService->createNavplanFpl($request->flightroute);
                $this->httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
