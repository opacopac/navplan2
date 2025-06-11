<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Exception;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\FileServiceException;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\ISystemConfig;


class FileService implements IFileService
{
    const TMP_DIR_PREFIX = 'tmpdl_';
    const TMP_DIR_TIMEOUT_SEC = 300;

    public function __construct(
        private readonly ISystemConfig $systemConfig,
        private readonly ILoggingService $loggingService
    )
    {
    }


    /**
     * @throws FileServiceException
     */
    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string
    {
        try {
            $this->loggingService->debug("reading file or stream '" . $filename . "'...");
            // TODO: handle warnings (currently suppressed with @ operator)
            $result = file_get_contents($filename, $use_include_path, $context);
        } catch (Exception $ex) {
            $this->logAndThrowException('error reading file or stream ' . $filename, $ex);
        }

        if ($result === FALSE) {
            $this->logAndThrowException('error reading file or stream ' . $filename);
        } else {
            return $result;
        }
    }


    /**
     * @throws FileServiceException
     */
    public function filePutContents(string $filename, $data, int $flags = 0, $context = null): int
    {
        try {
            $this->loggingService->debug("writing file or stream '" . $filename . "'...");
            $result = file_put_contents($filename, $data, $flags, $context);
        } catch (Exception $ex) {
            $this->logAndThrowException('error writing file or stream', $ex);
        }

        if ($result === FALSE) {
            $this->logAndThrowException('error writing file or stream');
        } else {
            return $result;
        }
    }


    public function file_exists(string $filename): bool
    {
        return file_exists($filename);
    }


    public function fopen(string $filename, string $mode): ?IFile
    {
        $file = fopen($filename, $mode);

        return $file === FALSE ? NULL : new File($file);
    }


    public function shell_exec(string $cmd): ?string
    {
        return shell_exec($cmd);
    }


    public function getTempDirBase(): string
    {
        return $this->systemConfig->getTempDir();
    }


    public function createTempDir(): string
    {
        $this->cleanUpTempDirs();

        $tmpDir = self::TMP_DIR_PREFIX . StringNumberHelper::createRandomString(20);
        mkdir($this->getTempDirBase() . $tmpDir);

        return $tmpDir;
    }


    public function glob(string $directory, int $flags): array|false
    {
        return glob($directory, $flags);
    }


    public function moveUploadedFile(string $from, string $to): bool
    {
        return move_uploaded_file($from, $to);
    }


    public function rename(string $from, string $to, $context = null): bool
    {
        return rename($from, $to, $context);
    }


    private function cleanUpTempDirs()
    {
        $tmpDirEntries = scandir($this->getTempDirBase());

        // iterate trough tmp dirs
        foreach ($tmpDirEntries as $tmpDir) {
            $tmpDirPath = $this->getTempDirBase() . $tmpDir;

            if (!is_dir($tmpDirPath) || !str_starts_with($tmpDir, self::TMP_DIR_PREFIX)) {
                continue;
            }

            // check if too old
            if (filemtime($tmpDirPath) > time() - self::TMP_DIR_TIMEOUT_SEC) {
                continue;
            }

            // iterate trough files of temp dir
            $innerDirEntries = scandir($tmpDirPath);

            foreach ($innerDirEntries as $tmpFile) {
                if ($tmpFile == '.' || $tmpFile == '..') {
                    continue;
                }

                $tmpFilePath = $tmpDirPath . "/" . $tmpFile;

                if (!unlink($tmpFilePath)) {
                    $this->logAndThrowException("ERROR: while deleting temp file '" . $tmpFilePath . "'");
                }
            }

            // remove tmp dir
            if (!rmdir($tmpDirPath)) {
                $this->logAndThrowException("ERROR: while deleting temp dir '" . $tmpDirPath . "'");
            }
        }
    }


    /**
     * @throws FileServiceException
     */
    private function logAndThrowException(string $msg, Exception $ex = NULL): void
    {
        $logMsg = $ex ? $msg . ': ' . $ex->getMessage() : $msg;
        $this->loggingService->error($logMsg);

        if ($ex !== NULL) {
            throw new FileServiceException($msg, 0, $ex);
        } else {
            throw new FileServiceException($msg);
        }
    }

    public function appendFilename(string $filename, string $appendix): string
    {
        $pathInfo = pathinfo($filename);
        $newFilename = $pathInfo["dirname"] . '/' . $pathInfo["filename"] . $appendix;

        if (isset($pathInfo["extension"])) {
            $newFilename .= '.' . $pathInfo["extension"];
        }

        return $newFilename;
    }

    function getRandomFilename(string $originalFilename): string
    {
        return StringNumberHelper::createRandomString(20)
            . "."
            . pathinfo($originalFilename, PATHINFO_EXTENSION);
    }
}
