<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use Navplan\MeteoSma\RestModel\ReadSmaMeasurementsRequestConverter;
use Navplan\MeteoSma\RestModel\SmaMeasurementsResponseConverter;


class MeteoServiceProcessor {
    public static function processRequest(IMeteoServiceDiContainer $diContainer) {
        $getArgs = $diContainer->getHttpService()->getGetArgs();
        $request = ReadSmaMeasurementsRequestConverter::fromArgs($getArgs);
        $response = $diContainer->getReadSmaMeasurementsUc()->read($request);
        $diContainer->getHttpService()->sendArrayResponse(SmaMeasurementsResponseConverter::toRest($response), NULL, TRUE);
    }
}
