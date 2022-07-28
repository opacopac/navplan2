<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use InvalidArgumentException;
use Navplan\Exporter\DomainService\IExportService;
use Navplan\Exporter\RestModel\RestExportExcelRequest;
use Navplan\Exporter\RestModel\RestExportFileConverter;
use Navplan\Exporter\RestModel\RestExportFplRequest;
use Navplan\Exporter\RestModel\RestExportGpxRequest;
use Navplan\Exporter\RestModel\RestExportKmlRequest;
use Navplan\Exporter\RestModel\RestExportPdfRequest;
use Navplan\System\DomainService\IHttpService;


class ExporterServiceController {
    const ARG_ACTION = "action";
    const ACTION_EXPORT_PDF = "exportpdf";
    const ACTION_EXPORT_EXCEL = "exportexcel";
    const ACTION_EXPORT_KML = "exportkml";
    const ACTION_EXPORT_GPX = "exportgpx";
    const ACTION_EXPORT_FPL = "exportfpl";


    public static function processRequest(
        IExportService $exportService,
        IHttpService $httpService
    ) {
        $postArgs = $httpService->getPostArgs();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_EXPORT_PDF:
                $request = RestExportPdfRequest::fromRest($postArgs);
                $exportFile = $exportService->createNavplanPdf($request->flightroute, $request->fuelCalc);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_EXCEL:
                $request = RestExportExcelRequest::fromRest($postArgs);
                $exportFile = $exportService->createNavplanExcel($request->flightroute, $request->fuelCalc);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_KML:
                $request = RestExportKmlRequest::fromRest($postArgs);
                $exportFile = $exportService->createNavplanKml($request->flightroute, $request->track);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_GPX:
                $request = RestExportGpxRequest::fromRest($postArgs);
                $exportFile = $exportService->createNavplanGpx($request->flightroute, $request->track);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_FPL:
                $request = RestExportFplRequest::fromRest($postArgs);
                $exportFile = $exportService->createNavplanFpl($request->flightroute);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
