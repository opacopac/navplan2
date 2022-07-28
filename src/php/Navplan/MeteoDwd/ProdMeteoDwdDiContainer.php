<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinService;
use Navplan\System\DomainService\IFileService;


class ProdMeteoDwdDiContainer implements IMeteoDwdDiContainer {
    private const METEO_DWD_BASE_DIR = __DIR__ . "/../../meteo_dwd/"; // TODO

    private IMeteoDwdService $meteoDwdService;


    public function __construct(
        private IFileService $fileService,
    ) {
    }


    function getMeteoDwdService(): IMeteoDwdService {
        if (!isset($this->meteoDwdService)) {
            $this->meteoDwdService = new MeteoBinService(
                $this->fileService,
                self::METEO_DWD_BASE_DIR
            );
        }

        return $this->meteoDwdService;
    }
}
