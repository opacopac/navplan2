<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnRepo;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\DomainService\IOgnRepo;


class OgnRepo implements IOgnRepo {
    const TMP_FILE_BASE_PATH = __DIR__ . "/../../../../tmp/";


    public function __construct(
        private IFileService $fileService,
        private IProcService $procService,
        private ITimeService $timeService
    ) {
    }


    public function setFilter(int $sessionId, Extent $extent) {
        $filterFile = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.filter';
        $filter = "a/" . $extent->maxPos->latitude . "/" . $extent->minPos->longitude
            . "/" . $extent->minPos->latitude . "/" . $extent->maxPos->longitude;
        $this->fileService->filePutContents($filterFile, $filter, LOCK_EX);
    }


    public function isListenerRunning(int $sessionId): bool {
        $lockFile = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.lock';
        if (!$this->fileService->file_exists($lockFile)) {
            return FALSE;
        } else {
            return TRUE;
        }
    }


    public function startListener(int $sessionId) {
        // TODO consts
        $this->procService->shell_exec("cd ../../../ognlistener; ./start_listener " . $sessionId);
        $this->procService->sleep(1);
    }


    public function readTraffic(int $sessionId): array {
        $aclist = [];
        $dumpFiles = [
            self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.dump0',
            self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.dump1'
        ];

        foreach ($dumpFiles as $dumpFile) {
            if (!$this->fileService->file_exists($dumpFile))
                continue;

            $file = $this->fileService->fopen($dumpFile, "r");
            while (!$file->feof()) {
                $line = $file->fgets();
                if ($line === FALSE) {
                    continue;
                }

                $acList[] = OgnRepoTrafficConverter::fromDumpFileLine($line, $this->timeService);
            }
        }

        return $aclist;
    }
}
