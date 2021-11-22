<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use InvalidArgumentException;
use Navplan\Exporter\RestModel\RestExportPdfRequestConverter;
use Navplan\Exporter\RestModel\RestExportPdfResponseConverter;


class ExporterServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_EXPORT_PDF = "exportpdf";


    public static function processRequest(array $postArgs, IExporterServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_EXPORT_PDF:
                $request = RestExportPdfRequestConverter::fromRest($postArgs);
                $response = $diContainer->getExportPdfUc()->exportPdf($request);
                $httpService->sendArrayResponse(RestExportPdfResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
