<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use InvalidArgumentException;
use Navplan\Exporter\RestModel\ExportFplRequest;
use Navplan\Exporter\RestModel\ExportGpxRequest;
use Navplan\Exporter\RestModel\ExportKmlRequest;
use Navplan\Exporter\RestModel\ExportPdfRequest;
use Navplan\Exporter\RestModel\RestExportFileConverter;


class ExporterServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_EXPORT_PDF = "exportpdf";
    const ACTION_EXPORT_KML = "exportkml";
    const ACTION_EXPORT_GPX = "exportgpx";
    const ACTION_EXPORT_FPL = "exportfpl";


    public static function processRequest(array $postArgs, IExporterServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_EXPORT_PDF:
                $request = ExportPdfRequest::fromRest($postArgs);
                $exportFile = $diContainer->getExportService()->createNavplanPdf($request->flightroute, $request->fuelCalc);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_KML:
                $request = ExportKmlRequest::fromRest($postArgs);
                $exportFile = $diContainer->getExportService()->createNavplanKml($request->flightroute, $request->track);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_GPX:
                $request = ExportGpxRequest::fromRest($postArgs);
                $exportFile = $diContainer->getExportService()->createNavplanGpx($request->flightroute, $request->track);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            case self::ACTION_EXPORT_FPL:
                $request = ExportFplRequest::fromRest($postArgs);
                $exportFile = $diContainer->getExportService()->createNavplanFpl($request->flightroute);
                $httpService->sendArrayResponse(RestExportFileConverter::toRest($exportFile));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
