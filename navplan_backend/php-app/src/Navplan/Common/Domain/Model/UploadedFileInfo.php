<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


class UploadedFileInfo
{
    public function __construct(
        public string $name,
        public string $type,
        public int $sizeBytes,
        public string $tmpName,
        public int $errorCode,
        public string $fullPath,
    )
    {
    }


    public function getErrorMessage(): string
    {
        return match ($this->errorCode) {
            UPLOAD_ERR_OK => "OK",
            UPLOAD_ERR_INI_SIZE => "The uploaded file exceeds the upload_max_filesize directive in php.ini",
            UPLOAD_ERR_FORM_SIZE => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
            UPLOAD_ERR_PARTIAL => "The uploaded file was only partially uploaded",
            UPLOAD_ERR_NO_FILE => "No file was uploaded",
            UPLOAD_ERR_NO_TMP_DIR => "Missing a temporary folder",
            UPLOAD_ERR_CANT_WRITE => "Failed to write file to disk",
            UPLOAD_ERR_EXTENSION => "A PHP extension stopped the file upload",
            default => "Unknown upload error code: $this->errorCode"
        };
    }
}
