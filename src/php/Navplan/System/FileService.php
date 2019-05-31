<?php declare(strict_types=1);

namespace Navplan\System;

use Exception;
use Navplan\System\IFileService;

require_once __DIR__ . "/../NavplanHelper.php";


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


    /**
     * @param string $filename
     * @param bool $use_include_path
     * @param null $context
     * @return string
     * @throws FileServiceException
     */
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


    /**
     * @param string $filename
     * @param $data
     * @param int $flags
     * @param null $context
     * @return int
     * @throws FileServiceException
     */
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
}
