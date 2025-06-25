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
        $this->loggingService->debug("opening file '" . $filename . "' with mode '" . $mode . "'...");
        $file = fopen($filename, $mode);

        return $file === FALSE ? NULL : new File($file);
    }


    public function delete(string $filename): bool
    {
        if (!$this->file_exists($filename)) {
            return true;
        }

        try {
            $this->loggingService->debug("deleting file '" . $filename . "'...");
            return unlink($filename);
        } catch (Exception $ex) {
            $this->logAndThrowException('error deleting file', $ex);
        }
    }


    public function shell_exec(string $cmd): ?string
    {
        $this->loggingService->debug("Executing Shell Command: $cmd");
        return shell_exec($cmd);
    }


    public function getTempDirBase(): string
    {
        return $this->systemConfig->getTempDir();
    }


    public function createTempDir(): string
    {
        $this->cleanUpTempDirs();

        // create a new temp dir with a random name
        $tmpDir = self::TMP_DIR_PREFIX . StringNumberHelper::createRandomString(20);
        $this->loggingService->debug("creating temp dir '" . $tmpDir . "'...");
        mkdir($this->getTempDirBase() . $tmpDir);

        return $tmpDir;
    }


    public function glob(string $directory, int $flags): array|false
    {
        return glob($directory, $flags);
    }


    public function moveUploadedFile(string $from, string $to): bool
    {
        $this->loggingService->debug("moving uploaded file from '" . $from . "' to '" . $to . "'...");
        return move_uploaded_file($from, $to);
    }


    public function rename(string $from, string $to, $context = null): bool
    {
        $this->loggingService->debug("renaming file from '" . $from . "' to '" . $to . "'...");
        return rename($from, $to, $context);
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


    public function getUniqueFilename(string $originalFilenameForName, string $originalFilenameForSuffix): string
    {
        $newFilename = pathInfo($originalFilenameForName, PATHINFO_FILENAME)
            . "_"
            . StringNumberHelper::createRandomString(20)
            . "."
            . pathinfo($originalFilenameForSuffix, PATHINFO_EXTENSION);

        return $this->cleanFilename($newFilename);
    }


    public function cleanFilename(string $filename): string
    {
        // replace umlauts and special characters
        $filename = str_replace(
            ['ä', 'ö', 'ü', 'Ä', 'Ö', 'Ü', 'ß', 'é', 'è', 'ê', 'É', 'È', 'Ê', 'ç', 'ô'],
            ['ae', 'oe', 'ue', 'Ae', 'Oe', 'Ue', 'ss', 'e', 'e', 'e', 'E', 'E', 'E', 'c', 'o'],
            $filename
        );

        // remove all characters except alphanumeric, underscore, dash and dot
        $cleanedFilename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $filename);

        // remove multiple dots, dashes & underscores
        $cleanedFilename = preg_replace('/\.+/', '.', $cleanedFilename);
        $cleanedFilename = preg_replace('/-+/', '-', $cleanedFilename);
        $cleanedFilename = preg_replace('/_+/', '_', $cleanedFilename);

        // remove leading and trailing dots, dashes and underscores
        $cleanedFilename = trim($cleanedFilename, '.');
        $cleanedFilename = trim($cleanedFilename, '-');
        $cleanedFilename = trim($cleanedFilename, '_');

        // ensure maximum length
        $maxLength = 255; // typical maximum length for filenames
        if (strlen($cleanedFilename) > $maxLength) {
            $cleanedFilename = substr($cleanedFilename, 0, $maxLength);
        }

        // ensure the filename is not empty
        if ($cleanedFilename === '') {
            throw new FileServiceException("Filename cannot be empty after cleaning.");
        }

        return $cleanedFilename;
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
}
