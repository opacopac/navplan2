<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Exception;
use Navplan\System\Domain\FileServiceException;
use Navplan\System\UseCase\IFile;
use Navplan\System\UseCase\IFileService;

// TODO: remove
require_once __DIR__ . "/../../NavplanHelper.php";


class FileService implements IFileService {
    private static $instance = NULL;


    public static function getInstance(): IFileService {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }


    private function __construct() {
    }


    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string {
        try {
            $result = file_get_contents($filename, $use_include_path, $context);
        } catch (Exception $ex) {
            throw new FileServiceException('error reading file or stream', 0, $ex);
        }

        if ($result === FALSE) {
            throw new FileServiceException('error reading file or stream');
        } else {
            return $result;
        }
    }


    public function filePutContents(string $filename, $data, int $flags = 0, $context = null): int {
        try {
            $result = file_put_contents($filename, $data, $flags, $context);
        } catch (Exception $ex) {
            throw new FileServiceException('error writing file or stream', 0, $ex);
        }

        if ($result === FALSE) {
            throw new FileServiceException('error writing file or stream');
        } else {
            return $result;
        }
    }


    public function file_exists(string $filename): bool {
        return file_exists($filename);
    }


    public function fopen(string $filename, string $mode): ?IFile {
        $file = fopen($filename, $mode);

        return $file === FALSE ? NULL : $file;
    }


    public function shell_exec(string $cmd): ?string {
        return shell_exec($cmd);
    }
}
